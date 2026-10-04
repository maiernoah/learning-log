/* ==========================================================================
   content.js : the only file you edit to change the log.

   1. SITE holds the name, tagline, sidebar blurb, and links.
   2. ENTRIES holds one { ... } block per log entry. Order in this file
      doesn't matter; the log sorts by date and time, newest first.

   Rules that keep this file working:
   - Every { ... } block in ENTRIES is followed by a comma.
   - Text goes inside quotes. Use backticks ` ` for summaries so you can
     use apostrophes and "double quotes" freely and break lines.
   - If the page shows a yellow box saying content.js has a mistake, it
     names the line. A missing comma or quote is the usual cause.
   ========================================================================== */

const SITE = {
  title: "Noah's Learning Log",
  tagline: "Notes and interactive pages from whatever I'm studying.",
  author: "Noah",

  // Optional. Leave as "" to keep your email off the site (recommended:
  // public email addresses get scraped by spammers).
  email: "",

  // Short HTML shown in the sidebar "About" box.
  blurb: `A running log of things I'm learning. Most entries link to an
          exhibit: a small interactive page built to work through one idea.`,

  // How many entries the front page shows before "Show all".
  frontPageCount: 10,

  // Entries newer than this many days get a NEW! marker.
  newForDays: 14,

  // Sidebar "Elsewhere" links. Delete the lines inside [ ] to hide the box.
  links: [
    // { label: "Some site I like", url: "https://example.com" },
  ],
};

const ENTRIES = [

  /* ---- TEMPLATE: copy this block, paste it below, fill it in ------------
  {
    slug: "short-name-with-hyphens",      // must match the folder name in exhibits/
    title: "What the page is called",
    date: "2026-10-04",                   // YYYY-MM-DD
    time: "07:30",                        // optional, 24-hour HH:MM
    url: "exhibits/short-name-with-hyphens/",
    tags: ["topic", "another topic"],
    summary: `What you learned, in a sentence or three. Simple HTML like
              <em>emphasis</em> and <a href="https://example.com">links</a> works.`,
  },
  ------------------------------------------------------------------------- */

  {
    slug: "sample-dialup-speeds",
    title: "Sample exhibit: how long a page took over dial-up",
    date: "2026-10-04",
    time: "07:03",
    url: "exhibits/sample-dialup-speeds/",
    tags: ["sample", "internet history"],
    summary: `A placeholder that shows how an exhibit plugs into the log. Pick a
              modem speed and a page size, then watch the page arrive at period
              speed. Delete this entry and its folder once you add your own.`,
  },

  {
    slug: "log-opened",
    title: "Log opened",
    date: "2026-10-04",
    time: "06:58",
    // No url: this is a text-only entry, so the title isn't a link.
    tags: ["meta"],
    summary: `Started this log to keep the interactive pages I build while
              learning, with a note on what each one taught me.`,
  },

];
