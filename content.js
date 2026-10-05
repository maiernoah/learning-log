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
  title: "Noah's Weblog",
  tagline: "Webpages, notes, and videos to help me learn complicated things.",
  author: "Noah",

  // The site's address. The RSS feed (feed.xml) builds its links from it.
  url: "https://noahmaier.net/",

  // Optional. Leave as "" to keep your email off the site (recommended:
  // public email addresses get scraped by spammers).
  email: "",

  // Short HTML shown in the sidebar "About" box.
  blurb: `Noah Maier shepherds a small referral-only fundraising practice for
          private family offices and non-profit executive directors. Areas of
          work include religion, consciousness research, artificial
          intelligence, and US politics. Noah lives in rural Colorado with his
          partner.`,

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

  ---- VIDEO: same as above, plus these two lines. Upload the video to
  YouTube as Unlisted, press Share, and paste the link it gives you.
  Leave out the url line for a video with no page of its own. ----------
    video: "https://youtu.be/VIDEO_ID",
    length: "12:30",                      // optional, shown next to the title
  ------------------------------------------------------------------------- */

  {
    slug: "harts-beauty-of-the-infinite",
    title: "Hart's Beauty of the Infinite",
    date: "2026-10-04",
    time: "12:18",
    url: "exhibits/harts-beauty-of-the-infinite/",
    tags: ["theology", "philosophy", "david bentley hart"],
    summary: `A ten-module course on David Bentley Hart's <em>The Beauty of the
              Infinite</em> (2003) and his case that persuasion can be peaceful,
              with Nietzsche, Levinas, Derrida, and his other critics given their
              best lines. Quizzes, hands-on activities, and spaced flashcards
              throughout.`,
  },

  {
    slug: "what-the-output-cant-see",
    title: "What the Output Can't See",
    date: "2026-10-04",
    time: "13:00",
    url: "exhibits/what-the-output-cant-see/",
    tags: ["philosophy", "consciousness"],
    summary: `A nine-part course on three short pieces by Eliezer Yudkowsky about where consciousness lives. Readers rebuild a question-answering machine from wires, pipes, squirrels or neurons, test his argument against panpsychism on an electron test bench, and weigh the strongest objections, with quizzes and spaced review cards throughout.`,
  },


  {
    slug: "bachs-goldberg-variations",
    title: "Bach's Goldberg Variations",
    date: "2026-10-04",
    time: "13:57",
    url: "exhibits/bachs-goldberg-variations/",
    tags: ["music", "johann sebastian bach"],
    summary: `A nine-part course on Peter Williams's <em>Bach: The Goldberg Variations</em> (2001), covering his Introduction and the chapters on the work's shape and its movements. The page plays the 32-note bass under different surfaces, maps the thirty variations into Bach's groups of three, lets you build a canon at any interval, and sorts performance choices by Williams's two "shapes" of the work. Quizzes and spaced flashcards throughout.`,
  },

  {
    slug: "dark-night-john-of-the-cross",
    title: "The Dark Night of John of the Cross",
    date: "2026-10-04",
    time: "15:17",
    url: "exhibits/dark-night-john-of-the-cross/",
    tags: ["theology", "john of the cross"],
    summary: `A six-part course on John of the Cross's <em>Ascent of Mount Carmel</em> and <em>Dark Night</em>, in the Kavanaugh and Rodriguez translation. Readers drag experiences onto John's map of the four nights, test his three signs for leaving meditation on sample cases, watch a sunbeam look darker as it gets purer, and step through his log in the fire. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "the-practice-of-asking",
    title: "The Practice of Asking",
    date: "2026-10-04",
    time: "15:54",
    url: "exhibits/the-practice-of-asking/",
    tags: ["fundraising", "philosophy"],
    summary: `A ten-part training for nonprofit executive directors, drawn from Noah's notes for <em>The Fundraising Act</em>. It argues that generosity is already present and the fundraiser's job is to clear what blocks it. It works through Mauss and the Bhagavad Gita on gifts, overflow versus guilt, the money story every fundraiser carries, asking from love, releasing the outcome, the seven steps under every gift, and the daily floor that keeps a practice alive. Readers clear rocks from a stream, compare two givers by dollars and by sacrifice, diagnose a hard ask, find where stalled gifts are really stuck, and work backwards from a goal to a daily number. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "cameron-berg-inside-the-machine",
    title: "Cameron Berg's Look Inside the Machine",
    date: "2026-10-04",
    time: "17:49",
    url: "exhibits/cameron-berg-inside-the-machine/",
    tags: ["artificial intelligence", "consciousness", "cameron berg"],
    summary: `A nine-part course on six papers by Cameron Berg and his collaborators (2024 to 2026) about what happens inside AI models that act like minds: self-other overlap and deception, models reporting experience under self-reference, Dark Triad feature steering, hidden coalitions among agents, the pain axis, and Berg's theory that learning requires feeling. Readers find a pain direction and turn the steering dial, run the burglar test, cut a network of agents, try the button experiments, separate surprise from valence, and sort measurements from interpretations. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "anil-seth-being-you",
    title: "Anil Seth's Being You",
    date: "2026-10-05",
    time: "05:34",
    url: "exhibits/anil-seth-being-you/",
    tags: ["neuroscience", "consciousness", "anil seth"],
    summary: `A ten-part course on Anil Seth's <em>Being You: A New Science of Consciousness</em> (2021) and his case that perception and the self are the brain's best guesses, rooted in keeping the body alive. Readers turn a hallucination dial until a face appears in the clouds, update a Bayesian guess as a gorilla walks closer, race a reactive thermostat against a predictive one, build a readiness potential out of pure noise, and zip a brain's echo to see why complexity alone can't measure consciousness. Quizzes and spaced review cards throughout.`,
  },
];
