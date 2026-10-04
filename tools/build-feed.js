#!/usr/bin/env node
/* ==========================================================================
   build-feed.js : writes feed.xml (an RSS 2.0 feed) from content.js.

   You don't need to run this. GitHub runs it after every change to
   content.js (see .github/workflows/feed.yml) and commits the new
   feed.xml. To run it by hand: node tools/build-feed.js

   The feed's addresses start with SITE.url from content.js. Item ids use
   https:// and the domain in CNAME, so they never change and feed readers
   never show an entry twice.
   ========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const MAX_ITEMS = 30;
const TIME_ZONE = "America/Denver";   // the times in content.js are Noah's local time

function load() {
  const src = fs.readFileSync(path.join(ROOT, "content.js"), "utf8");
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src + "\n;this.SITE = SITE; this.ENTRIES = ENTRIES;", ctx, { filename: "content.js" });
  return { site: ctx.SITE || {}, entries: Array.isArray(ctx.ENTRIES) ? ctx.ENTRIES : [] };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (s) => "<![CDATA[" + String(s).split("]]>").join("]]]]><![CDATA[>") + "]]>";

function youtubeId(v) {
  const s = String(v || "").trim();
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/|\/v\/)([\w-]{11})(?![\w-])/);
  return m ? m[1] : (/^[\w-]{11}$/.test(s) ? s : null);
}

// Wall-clock date and time in TIME_ZONE -> Date (handles daylight saving time)
function zonedTime(date, time) {
  const [y, mo, d] = date.split("-").map(Number);
  const [hh, mm] = (/^\d{2}:\d{2}$/.test(time || "") ? time : "12:00").split(":").map(Number);
  const wall = Date.UTC(y, mo - 1, d, hh, mm);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
  });
  const offsetAt = (t) => {
    const p = Object.fromEntries(fmt.formatToParts(new Date(t)).map((x) => [x.type, x.value]));
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - t;
  };
  let utc = wall - offsetAt(wall);
  utc = wall - offsetAt(utc);
  return new Date(utc);
}

function main() {
  const { site, entries } = load();
  const cnamePath = path.join(ROOT, "CNAME");
  const domain = fs.existsSync(cnamePath) ? fs.readFileSync(cnamePath, "utf8").trim() : "";
  const base = String(site.url || (domain ? "https://" + domain + "/" : "")).replace(/\/*$/, "/");
  if (!/^https?:\/\//.test(base)) throw new Error("Set url in SITE (content.js), like \"https://noahmaier.net/\".");
  const idBase = "https://" + (domain || base.replace(/^https?:\/\//, "").split("/")[0]) + "/";
  const abs = (u) => (/^[a-z][a-z0-9+.-]*:/i.test(u) ? u : base + String(u).replace(/^\.?\//, ""));

  const items = entries
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => e && e.slug && e.title && /^\d{4}-\d{2}-\d{2}$/.test(e.date || ""))
    .map(({ e, i }) => ({ e, i, when: zonedTime(e.date, e.time) }))
    .sort((a, b) => b.when - a.when || a.i - b.i)
    .slice(0, MAX_ITEMS);

  const out = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>');
  out.push('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
  out.push("<channel>");
  out.push("  <title>" + esc(site.title || "Weblog") + "</title>");
  out.push("  <link>" + esc(base) + "</link>");
  out.push("  <description>" + esc(site.tagline || site.title || "") + "</description>");
  out.push("  <language>en-us</language>");
  out.push('  <atom:link href="' + esc(base + "feed.xml") + '" rel="self" type="application/rss+xml"/>');
  if (items.length) out.push("  <lastBuildDate>" + items[0].when.toUTCString() + "</lastBuildDate>");

  for (const { e, when } of items) {
    const url = e.url ? String(e.url).trim() : "";
    const link = url ? abs(url) : base + "#" + e.slug;
    let html = String(e.summary || "").trim();
    if (html && !/<p[\s>]/i.test(html)) html = "<p>" + html + "</p>";
    html = html.replace(/(href|src)="(?![a-z][a-z0-9+.-]*:)([^"]*)"/gi, (_, a, u) => a + '="' + abs(u) + '"');
    const vid = youtubeId(e.video);
    if (vid) {
      const watch = "https://www.youtube.com/watch?v=" + vid;
      html += '<p><a href="' + watch + '"><img src="https://i.ytimg.com/vi/' + vid +
        '/hqdefault.jpg" width="480" height="360" alt="Still from the video"></a></p>' +
        '<p><a href="' + watch + '">Watch the video' + (e.length ? " (" + esc(e.length) + ")" : "") + "</a></p>";
    }
    if (url) {
      const exhibit = /^(\.\/)?exhibits\//.test(url);
      html += '<p><a href="' + esc(link) + '">' + (exhibit ? "Open the interactive page" : "Open the link") + "</a></p>";
    }
    out.push("  <item>");
    out.push("    <title>" + esc(e.title) + (vid ? " (video)" : "") + "</title>");
    out.push("    <link>" + esc(link) + "</link>");
    out.push('    <guid isPermaLink="false">' + esc(idBase + "#" + e.slug) + "</guid>");
    out.push("    <pubDate>" + when.toUTCString() + "</pubDate>");
    for (const t of Array.isArray(e.tags) ? e.tags : []) out.push("    <category>" + esc(String(t).trim().toLowerCase()) + "</category>");
    out.push("    <description>" + cdata(html) + "</description>");
    out.push("  </item>");
  }
  out.push("</channel>");
  out.push("</rss>");
  fs.writeFileSync(path.join(ROOT, "feed.xml"), out.join("\n") + "\n");
  console.log("feed.xml: " + items.length + " entries, links start with " + base);
}

main();
