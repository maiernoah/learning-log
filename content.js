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

  // Sections: a separate page in the nav, next to Archives. An entry with
  // section: "due-diligence" shows only there, not on the front page, Topics,
  // Archives or the RSS feed.
  sections: {
    "due-diligence": {
      title: "Dossier",
      href: "diligence/",   // the nav item opens this page instead of the log's section view
      intro: `Dossiers on nonprofits, compiled from the public record. Order one, or read about
              the method, on <a href="diligence/">the Dossier page</a>.`,
    },
  },
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
    summary: `A nine-part course on three pieces by Eliezer Yudkowsky about where consciousness lives: two posts on X (17 April 2026) and a 2026 essay on chickens, AI and qualia. Yudkowsky is a writer on AI risk who helped found the Machine Intelligence Research Institute and the LessWrong blog. Readers rebuild a question-answering machine from wires, pipes, squirrels or neurons, test his argument against panpsychism on an electron test bench, and weigh the strongest objections, with quizzes and spaced review cards throughout.`,
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
    date: "2026-10-23",
    time: "14:46",
    url: "exhibits/anil-seth-being-you/",
    tags: ["neuroscience", "consciousness", "anil seth"],
    summary: `A thirteen-part course on Anil Seth's <em>Being You</em> (2021) and his 2026 paper on conscious AI. Readers turn a hallucination dial, update a Bayesian guess as a gorilla walks closer, race two thermostats, and zip a brain's echo. They also sort which computer tasks are real and which only simulated, place views on conscious AI among Seth's five scenarios, and test whether knowing the truth breaks an illusion. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "chalmers-hard-problem",
    title: "Chalmers and the Hard Problem",
    date: "2026-10-05",
    time: "05:34",
    url: "exhibits/chalmers-hard-problem/",
    tags: ["philosophy", "consciousness", "david chalmers"],
    summary: `A nine-part course on David Chalmers' view of consciousness, drawn from <em>The Conscious Mind</em> (1996) and <em>The Character of Consciousness</em> (2010). Readers run an explanation machine on a gene, on life, and on seeing red to find where the hard problem appears, sort which facts come for free once the physics is fixed, rebuild the zombie argument, trace their own path through Chalmers' six positions from type A to type F, run a binocular-rivalry experiment, swap a brain's neurons for chips one at a time, and test which differences make a difference. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "hofstadters-strange-loop",
    title: "Hofstadter's Strange Loop",
    date: "2026-10-05",
    time: "05:40",
    url: "exhibits/hofstadters-strange-loop/",
    tags: ["philosophy", "consciousness", "douglas hofstadter"],
    summary: `A nine-part course on Douglas Hofstadter's <em>I Am a Strange Loop</em> (2007), drawing on <em>The Mind's I</em>, <em>Surfaces and Essences</em>, and his essay "Analogy as the Core of Cognition." Readers run a computer made of dominoes to see how "641 is prime" can explain a domino that never falls. They aim a simulated camera at its own screen, encode formulas as Gödel numbers, build Quine's self-describing sentence, step around the loop that makes an "I," and test teleporter puzzles. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "dennett-consciousness-explained",
    title: "Dennett's Consciousness Explained",
    date: "2026-10-05",
    time: "05:35",
    url: "exhibits/dennett-consciousness-explained/",
    tags: ["philosophy", "consciousness", "daniel dennett"],
    summary: `A ten-part course on Daniel C. Dennett's <em>Consciousness Explained</em> (1991), the book that argues there is no inner screen or watcher in the head, yet takes experience seriously as something to explain. Readers run the color phi experiment, probe the brain's drafts at different moments, move the line between Orwellian and Stalinesque stories, tap the cutaneous rabbit, evolve learners in a Baldwin-effect simulation, find their own blind spot, and pick out their own boat on a shared radar screen. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "kati-devaney-attention-to-cessation",
    title: "Kati Devaney's Path from Attention to Cessation",
    date: "2026-10-05",
    time: "12:40",
    url: "exhibits/kati-devaney-attention-to-cessation/",
    tags: ["neuroscience", "meditation", "kati devaney"],
    summary: `A ten-part course through nine papers by neuroscientist Kati (Kathryn J.) Devaney and colleagues, 2016 to 2026, in the order they were published. It moves from mapping vision in a single brain, to the seesaw between the brain's attention and default mode networks, to what long-term meditators' brains show during tasks and at rest. From there it covers how that seesaw tracks steady walking, what silent retreats may do to the language network, and the first measurements of meditative cessation and jhana. Readers set network correlations, average simulated brains, compute stride variability, and sort claims by how strong their evidence is.`,
  },

  {
    slug: "cornell-power-of-focusing",
    title: "Cornell's The Power of Focusing",
    date: "2026-10-15",
    time: "13:08",
    url: "exhibits/cornell-power-of-focusing/",
    tags: ["psychology", "ann weiser cornell"],
    summary: `A ten-part course on Ann Weiser Cornell's <em>The Power of Focusing</em> (1996), her practical manual for listening to vague feelings in the body until they shift. Readers sort therapy-tape lines the way Gendlin's researchers did, step through Ted's first session as his clenched stomach lets go, rewrite "I am sad" into "part of me is sad," offer words to a felt sense until one fits, find the edge in a client's halting speech, and practice being a listener who doesn't fix. A guided sixteen-step session with a stopping-time clock is built in for trying it yourself. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "mind-like-water",
    title: "Mind Like Water",
    date: "2026-10-15",
    time: "14:12",
    url: "exhibits/mind-like-water/",
    tags: ["productivity", "meditation", "david allen"],
    summary: `An eight-part course that reads David Allen's <em>Getting Things Done</em> and <em>Ready for Anything</em>, plus five recorded conversations with Allen, as a householder's practice of presence rather than a productivity hack. Readers clear a rippling pond by running eight worries through Allen's two questions, sort items into his buckets, order the weekly review, climb from one chemistry assignment to purpose, filter next actions by context and energy, and set a sitting practice beside Allen's own words on what he does and does not teach. Quizzes and spaced review cards throughout.`,
  },

  {
    slug: "diligence",
    section: "due-diligence",
    title: "Dossier",
    date: "2026-10-30",
    time: "20:20",
    url: "diligence/",
    tags: ["fundraising", "philanthropy"],
    summary: `A due-diligence dossier on any U.S. nonprofit, compiled by research agents from the public record: identity and structure, the money, the ratios, the public record, what actually changed because of the organization, the field, the culture, four futures, and a verdict with a health score, a pre-mortem and the questions to ask before giving. Every claim is tagged evidence, inference or speculation. Two sample dossiers and the pricing are on the page.`,
  },

  {
    slug: "diligence-aclu-of-northern-california",
    section: "due-diligence",
    title: "Dossier: ACLU of Northern California",
    date: "2026-10-30",
    time: "20:19",
    url: "diligence/aclu-of-northern-california/",
    tags: ["fundraising", "philanthropy"],
    summary: `A sample dossier on the ACLU of Northern California: the 501(c)(3) and 501(c)(4) pair, fifteen years of 990 numbers, the ratio flags, nine court outcomes ranked by significance and shared credit beside ten losses and reversals, four futures on the legal channel and the money, and a verdict that names a second quiet retrenchment as the most likely failure. Password-protected.`,
  },

  {
    slug: "diligence-the-consciousness-foundation",
    section: "due-diligence",
    title: "Dossier: The Consciousness Foundation",
    date: "2026-10-30",
    time: "20:18",
    url: "diligence/the-consciousness-foundation/",
    tags: ["fundraising", "philanthropy", "consciousness"],
    summary: `A sample dossier on The Consciousness Foundation, a fifteen-month-old grantmaker for awakening science with no Form 990 yet. It shows what the method does with a young organization: a score that grades evidenced health rather than promise, a results ledger that says everything is too early to judge, and a verdict on what kind of gift fits. Password-protected.`,
  },

  {
    slug: "diligence-fungi-foundation",
    section: "due-diligence",
    title: "Dossier: Fungi Foundation",
    date: "2026-10-30",
    time: "21:35",
    url: "diligence/fungi-foundation/",
    tags: ["fundraising", "philanthropy", "environment"],
    summary: `A sample dossier on the Fungi Foundation, a small founder-led charity in New York built on top of a Chilean foundation from 2012. Four years of 990s show three straight deficits and about two months of reserves beside real wins in getting fungi written into conservation language and pledges. The dossier reads the founder's own writing across 31 pieces, sets the futures on state commitment to fungal conservation and the reach of private nature capital, and names a quiet stall as the most likely failure. Password-protected.`,
  },
];
