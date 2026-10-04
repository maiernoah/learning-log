/* ==========================================================================
   log.js : builds the masthead, log, sidebar, and footer from content.js.
   You shouldn't need to edit this file. Add entries in content.js.
   ========================================================================== */
(function () {
  "use strict";

  var IS_FILE = location.protocol === "file:";
  var PAGE = document.body.getAttribute("data-page") || "log";
  var ON_LOG = PAGE === "log";
  var HOME = IS_FILE ? "index.html" : "./";
  var RESERVED = ["all", "topics", "archives", "find", "about-box", "elsewhere", "log"];
  var DAY_MS = 86400000;

  /* ---------- load content.js safely ---------- */

  var problems = [];
  var site = typeof SITE !== "undefined" && SITE && typeof SITE === "object" ? SITE : null;
  var raw = typeof ENTRIES !== "undefined" && Array.isArray(ENTRIES) ? ENTRIES : null;

  if (!site || !raw) problems.push(contentLoadError());

  site = Object.assign(
    { title: "Learning Log", tagline: "", author: "", email: "", blurb: "",
      frontPageCount: 10, newForDays: 14, links: [] },
    site || {}
  );

  var entries = dropDuplicates((raw || []).map(normalize).filter(Boolean));
  entries.sort(function (a, b) { return b.when - a.when || a.order - b.order; });

  var bySlug = {};
  entries.forEach(function (e, i) { bySlug[e.slug] = e; e.rank = i; });

  /* ---------- helpers ---------- */

  function h(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] == null || attrs[k] === false) return;
        if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (kids || []).forEach(function (kid) {
      if (kid == null) return;
      node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  function contentLoadError() {
    var errs = window.__logErrors || [];
    var tip = " Usually a missing comma, quote, or backtick on that line or the one above.";
    for (var i = 0; i < errs.length; i++) {
      var e = errs[i];
      if (e.filename && /content\.js(\?|$)/.test(e.filename) && e.lineno) {
        return "content.js has a mistake on line " + e.lineno + " (" + e.message + ")." + tip;
      }
    }
    if (errs.length) {
      return "content.js has a mistake, and this browser didn't say which line." +
        " Usually a missing comma, quote, or backtick. Opening the site through a host," +
        " or in another browser, often shows the line number.";
    }
    return "content.js didn't load. Check that it sits in the same folder as index.html.";
  }

  function normalize(e, i) {
    var where = "Entry " + (i + 1) + (e && e.title ? " (“" + e.title + "”)" : "");
    if (!e || typeof e !== "object") {
      problems.push(where + " isn't wrapped in { } braces.");
      return null;
    }
    var ok = true;
    if (!e.title) { problems.push(where + " needs a title."); ok = false; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || "")) {
      problems.push(where + ": date should look like 2026-10-04."); ok = false;
    }
    if (e.time && !/^\d{2}:\d{2}$/.test(e.time)) {
      problems.push(where + ": time should look like 07:03 (24-hour clock).");
    }
    if (!e.slug) {
      problems.push(where + " needs a slug."); ok = false;
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug)) {
      problems.push(where + ": slug “" + e.slug + "” can only use lowercase letters, numbers, and single hyphens.");
      ok = false;
    } else if (RESERVED.indexOf(e.slug) !== -1) {
      problems.push(where + ": “" + e.slug + "” is reserved by the log. Pick another slug.");
      ok = false;
    }
    if (!ok) return null;

    var hasTime = /^\d{2}:\d{2}$/.test(e.time || "");
    var when = new Date(e.date + "T" + (hasTime ? e.time : "12:00") + ":00");
    if (isNaN(when.getTime())) {
      problems.push(where + ": “" + e.date + "” isn't a real date.");
      return null;
    }
    var tags = (Array.isArray(e.tags) ? e.tags : [])
      .map(function (t) { return String(t).trim().toLowerCase(); })
      .filter(Boolean);
    var summary = e.summary ? String(e.summary).trim() : "";

    return {
      slug: e.slug,
      title: String(e.title),
      when: when,
      hasTime: hasTime,
      url: e.url ? String(e.url).trim() : "",
      tags: tags,
      summary: summary,
      order: i,
      haystack: (e.title + " " + stripHtml(summary) + " " + tags.join(" ")).toLowerCase()
    };
  }

  function dropDuplicates(list) {
    var seen = {};
    return list.filter(function (e) {
      if (seen[e.slug]) {
        problems.push("Two entries use the slug “" + e.slug + "”. Each slug must be unique; only the first one is shown.");
        return false;
      }
      seen[e.slug] = true;
      return true;
    });
  }

  function stripHtml(html) {
    var doc = new DOMParser().parseFromString("<body>" + html + "</body>", "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  }

  function href(url) {
    if (!url) return "";
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.charAt(0) === "#") return url;
    if (IS_FILE && /\/$/.test(url)) return url + "index.html";
    return url;
  }

  function isExternal(url) { return /^https?:\/\//i.test(url); }

  function logLink(hash) { return (ON_LOG ? "" : HOME) + "#" + hash; }

  function dayKey(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function monthKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1); }
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function fmtDay(d) {
    return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }
  function fmtTime(d) {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  function fmtMonth(key) {
    var p = key.split("-");
    return new Date(+p[0], +p[1] - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
  function plural(n, word) {
    if (n === 1) return n + " " + word;
    var many = /[^aeiou]y$/.test(word) ? word.slice(0, -1) + "ies"
      : /(s|x|ch|sh)$/.test(word) ? word + "es"
      : word + "s";
    return n + " " + many;
  }

  function isNew(e) {
    var age = Date.now() - e.when.getTime();
    return age > -DAY_MS && age < site.newForDays * DAY_MS;
  }

  /* ---------- masthead ---------- */

  function renderMasthead() {
    var mast = document.getElementById("masthead");
    if (!mast) return;
    mast.className = "masthead";
    mast.textContent = "";

    var row = h("div", { class: "mast-row" });
    var id = h("div", { class: "mast-id" });
    row.appendChild(id);
    row.appendChild(renderFind());
    mast.appendChild(row);

    var titleNode = ON_LOG
      ? document.createTextNode(site.title)
      : h("a", { href: HOME, text: site.title });
    id.appendChild(h("h1", null, [titleNode]));
    if (site.tagline) id.appendChild(h("p", { class: "tagline", text: site.tagline }));

    var items = [
      ["Home", HOME, ON_LOG],
      ["About", "about.html", PAGE === "about"],
      ["Topics", "#topics", false],
      ["Archives", "#archives", false]
    ];
    var nav = h("nav", { class: "nav", "aria-label": "Site" }, ["[ "]);
    items.forEach(function (it, i) {
      if (i) nav.appendChild(document.createTextNode(" | "));
      nav.appendChild(h("a", { href: it[1], text: it[0], "aria-current": it[2] ? "page" : null }));
    });
    nav.appendChild(document.createTextNode(" ]"));
    id.appendChild(nav);
    mast.appendChild(h("hr", { class: "bevel" }));
  }

  /* Find box in the top right. On the log it filters as you type; on other
     pages, pressing Enter opens the log with the search applied. */
  function renderFind() {
    findBox = h("input", {
      type: "search", id: "find-input", class: "field", autocomplete: "off",
      placeholder: "Titles, notes, topics", "aria-describedby": "find-note"
    });
    var form = h("form", { class: "find", role: "search", "aria-label": "Search the log" }, [
      h("div", { class: "find-row" }, [
        h("label", { for: "find-input", text: "Find:" }),
        findBox
      ]),
      h("p", { id: "find-note", class: "find-note", "aria-live": "polite" })
    ]);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var q = findBox.value.trim();
      if (!ON_LOG && q) location.href = HOME + "#find=" + encodeURIComponent(q);
    });
    if (ON_LOG) findBox.addEventListener("input", renderLog);
    return form;
  }

  /* ---------- the log ---------- */

  var findBox = null;

  function currentView() {
    var q = findBox ? findBox.value.trim() : "";
    if (q) return { kind: "find", value: q };
    var hash = decodeHash();
    if (hash.indexOf("tag=") === 0) return { kind: "tag", value: hash.slice(4).toLowerCase() };
    if (hash.indexOf("month=") === 0) return { kind: "month", value: hash.slice(6) };
    if (hash === "all") return { kind: "all" };
    if (bySlug[hash] && bySlug[hash].rank >= site.frontPageCount) return { kind: "all" };
    return { kind: "front" };
  }

  function decodeHash() {
    try { return decodeURIComponent(location.hash.slice(1)); }
    catch (err) { return location.hash.slice(1); }
  }

  function isLogHash(hash) {
    return hash === "" || hash === "all" || hash.indexOf("tag=") === 0 ||
      hash.indexOf("month=") === 0 || hash.indexOf("find=") === 0 || !!bySlug[hash];
  }

  function select(view) {
    switch (view.kind) {
      case "find":
        var words = view.value.toLowerCase().split(/\s+/);
        return entries.filter(function (e) {
          return words.every(function (w) { return e.haystack.indexOf(w) !== -1; });
        });
      case "tag":
        return entries.filter(function (e) { return e.tags.indexOf(view.value) !== -1; });
      case "month":
        return entries.filter(function (e) { return monthKey(e.when) === view.value; });
      case "all":
        return entries.slice();
      default:
        return entries.slice(0, site.frontPageCount);
    }
  }

  function statusLine(view, count) {
    if (view.kind === "front" || view.kind === "find") return null;
    var p = h("p", { class: "status" });
    if (view.kind === "tag") {
      p.appendChild(document.createTextNode(plural(count, "entry") + " tagged "));
      p.appendChild(h("b", { text: view.value }));
      p.appendChild(document.createTextNode(". "));
    } else if (view.kind === "month") {
      p.appendChild(document.createTextNode(plural(count, "entry") + " from "));
      p.appendChild(h("b", { text: /^\d{4}-\d{2}$/.test(view.value) ? fmtMonth(view.value) : view.value }));
      p.appendChild(document.createTextNode(". "));
    } else {
      p.appendChild(document.createTextNode("All " + plural(count, "entry") + ", newest first. "));
    }
    p.appendChild(h("a", { href: "#", text: "Back to the front page" }));
    return p;
  }

  function renderEntry(e) {
    var art = h("article", { class: "entry", id: e.slug });
    var head = h("h3");
    if (e.url) {
      head.appendChild(h("a", { href: href(e.url), text: e.title }));
      if (isExternal(e.url)) {
        var host = e.url.replace(/^https?:\/\//i, "").split(/[\/?#]/)[0].replace(/^www\./, "");
        head.appendChild(document.createTextNode(" "));
        head.appendChild(h("span", { class: "host", text: "(" + host + ")" }));
      }
    } else {
      head.appendChild(document.createTextNode(e.title));
    }
    if (isNew(e)) head.appendChild(h("span", { class: "new", text: "NEW!" }));
    art.appendChild(head);

    if (e.summary) {
      var body = /<p[\s>]/i.test(e.summary) ? e.summary : "<p>" + e.summary + "</p>";
      art.appendChild(h("div", { class: "summary", html: body }));
    }

    var by = h("p", { class: "byline" });
    var posted = "Posted" + (site.author ? " by " + site.author : "") +
      (e.hasTime ? " at " + fmtTime(e.when) : "");
    by.appendChild(document.createTextNode(posted + " | "));
    by.appendChild(h("a", { href: "#" + e.slug, text: "link", title: "Permanent link to this entry" }));
    if (e.tags.length) {
      by.appendChild(document.createTextNode(" | topics: "));
      e.tags.forEach(function (t, i) {
        if (i) by.appendChild(document.createTextNode(", "));
        by.appendChild(h("a", { href: "#tag=" + encodeURIComponent(t), text: t }));
      });
    }
    art.appendChild(by);
    return art;
  }

  function renderLog() {
    var main = document.getElementById("log");
    if (!main) return;
    main.textContent = "";

    if (problems.length) {
      var box = h("div", { class: "problems", role: "alert" }, [
        h("strong", { text: "Something in content.js needs fixing:" })
      ]);
      var ul = h("ul");
      problems.forEach(function (msg) { ul.appendChild(h("li", { text: msg })); });
      box.appendChild(ul);
      main.appendChild(box);
    }

    var view = currentView();
    var list = select(view);
    var status = statusLine(view, list.length);
    if (status) main.appendChild(status);

    if (!entries.length) {
      main.appendChild(h("p", { class: "empty", text: "No entries yet. Add one in content.js." }));
    } else if (!list.length) {
      var msg = view.kind === "find"
        ? "Nothing matches “" + view.value + "”."
        : "No entries here.";
      main.appendChild(h("p", { class: "empty", text: msg }));
    }

    var lastDay = "";
    list.forEach(function (e) {
      var key = dayKey(e.when);
      if (key !== lastDay) {
        main.appendChild(h("h2", { class: "day", text: fmtDay(e.when) }));
        lastDay = key;
      }
      main.appendChild(renderEntry(e));
    });

    if (view.kind === "front" && entries.length > site.frontPageCount) {
      main.appendChild(h("p", { class: "more" }, [
        h("a", { href: "#all", text: "Show all " + entries.length + " entries" })
      ]));
    }

    var label = view.kind === "tag" ? "Topic: " + view.value
      : view.kind === "month" ? fmtMonth(view.value)
      : view.kind === "all" ? "All entries"
      : view.kind === "find" ? "Search: " + view.value
      : "";
    document.title = label ? label + " | " + site.title : site.title;

    var note = document.getElementById("find-note");
    if (note) note.textContent = view.kind === "find" ? plural(list.length, "match") + "." : "";
    markCurrent(view);
  }

  /* ---------- sidebar ---------- */

  function panel(id, title, kids) {
    var headId = id + "-title";
    return h("section", { class: "side-section", id: id, "aria-labelledby": headId },
      [h("h2", { id: headId, text: title })].concat(kids));
  }

  function renderSidebar() {
    var side = document.getElementById("sidebar");
    if (!side) return;
    side.classList.add("sidebar");
    side.textContent = "";

    var about = [];
    if (site.blurb) about.push(h("p", { html: site.blurb }));
    about.push(h("p", null, [h("a", { href: "about.html", text: "More about this log" })]));
    side.appendChild(panel("about-box", "About", about));

    var tagCounts = {};
    entries.forEach(function (e) {
      e.tags.forEach(function (t) { tagCounts[t] = (tagCounts[t] || 0) + 1; });
    });
    var tags = Object.keys(tagCounts).sort();
    var tagList = h("ul");
    tags.forEach(function (t) {
      tagList.appendChild(h("li", { "data-tag": t }, [
        h("a", { href: logLink("tag=" + encodeURIComponent(t)), text: t }),
        h("span", { class: "count", text: " (" + tagCounts[t] + ")" })
      ]));
    });
    side.appendChild(panel("topics", "Topics",
      tags.length ? [tagList] : [h("p", { text: "No topics yet." })]));

    var monthCounts = {};
    entries.forEach(function (e) {
      var k = monthKey(e.when);
      monthCounts[k] = (monthCounts[k] || 0) + 1;
    });
    var months = Object.keys(monthCounts).sort().reverse();
    var monthList = h("ul");
    months.forEach(function (m) {
      monthList.appendChild(h("li", { "data-month": m }, [
        h("a", { href: logLink("month=" + m), text: fmtMonth(m) }),
        h("span", { class: "count", text: " (" + monthCounts[m] + ")" })
      ]));
    });
    side.appendChild(panel("archives", "Archives",
      months.length ? [monthList] : [h("p", { text: "Nothing archived yet." })]));

    var links = (site.links || []).filter(function (l) { return l && l.url && l.label; });
    if (links.length) {
      var linkList = h("ul");
      links.forEach(function (l) {
        linkList.appendChild(h("li", null, [h("a", { href: l.url, text: l.label })]));
      });
      side.appendChild(panel("elsewhere", "Elsewhere", [linkList]));
    }
  }

  function markCurrent(view) {
    var nodes = document.querySelectorAll("#sidebar li[data-tag], #sidebar li[data-month]");
    Array.prototype.forEach.call(nodes, function (li) {
      var on = (view.kind === "tag" && li.getAttribute("data-tag") === view.value) ||
        (view.kind === "month" && li.getAttribute("data-month") === view.value);
      li.classList.toggle("current", on);
    });
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    var foot = document.getElementById("colophon");
    if (!foot) return;
    foot.className = "colophon";
    foot.textContent = "";
    foot.appendChild(h("hr", { class: "bevel" }));
    var addr = h("address");
    if (site.author) {
      addr.appendChild(document.createTextNode("Maintained by "));
      addr.appendChild(site.email
        ? h("a", { href: "mailto:" + site.email, text: site.author })
        : document.createTextNode(site.author));
      addr.appendChild(document.createTextNode(". "));
    }
    if (entries.length) {
      addr.appendChild(document.createTextNode(
        "Last updated " + fmtDay(entries[0].when) + ". " + plural(entries.length, "entry") + " so far."));
    }
    foot.appendChild(addr);
  }

  /* ---------- go ---------- */

  renderMasthead();
  renderSidebar();
  renderFooter();

  // A search started on another page arrives as #find=words.
  function applyFindHash(hash) {
    findBox.value = hash.indexOf("find=") === 0 ? hash.slice(5) : "";
  }

  if (ON_LOG) {
    var start = decodeHash();
    applyFindHash(start);
    renderLog();
    if (bySlug[start]) {
      var target = document.getElementById(start);
      if (target) target.scrollIntoView();
    }

    window.addEventListener("hashchange", function () {
      var hash = decodeHash();
      if (!isLogHash(hash)) return;   // plain anchors like #topics just scroll
      applyFindHash(hash);
      renderLog();
      var main = document.getElementById("log");
      if (bySlug[hash]) {
        var el = document.getElementById(hash);
        if (el) el.scrollIntoView();
      } else if (main) {
        var top = main.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight) main.scrollIntoView();
      }
    });
  }
})();
