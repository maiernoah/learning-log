# Noah's Weblog

A log of things I'm learning. Most entries link to an exhibit: a small interactive page built to work through one idea.

Live site: https://noahmaier.net/

## What's in here

```
content.js           the file you edit: site name, sidebar text, entries
index.html           front page (the log)
about.html           about page; edit its paragraphs directly
log.css              colors and fonts
log.js               builds the page from content.js (leave alone)
return.js            "Back to the log" button for exhibits (leave alone)
404.html             "Not Found" page
.nojekyll            tells GitHub Pages to serve the files as they are
exhibits/
  <slug>/
    index.html       one folder per interactive page
```

Every change committed to the `main` branch republishes the site automatically after a short wait.

## Add an interactive page

1. Get the page's HTML. For a Claude artifact, ask Claude in any chat for the artifact's HTML as a file.
2. Pick a slug: lowercase letters, numbers, and hyphens, like `harts-beauty-of-the-infinite`. It becomes the page's address, `.../exhibits/harts-beauty-of-the-infinite/`. Changing it later breaks links you've shared.
3. On GitHub, open the `exhibits` folder and choose Add file, then Create new file. Type `<slug>/index.html` as the name (typing the slash creates the folder) and paste the HTML. Commit.
4. Optional: just above `</body>` in that file, add this line for a "Back to the log" button:
   ```html
   <script src="../../return.js"></script>
   ```
5. Open `content.js`, click the pencil icon, copy the template block into the `ENTRIES` list, fill it in, and commit. The `url` is `exhibits/<slug>/`.

Two other kinds of entry:

- Text only: leave out the `url` line. The title shows as plain text.
- A page hosted somewhere else: put the full `https://` address in `url`. The log shows the site's name next to the title. A claude.ai artifact link only works for visitors after the artifact is shared.

If `content.js` breaks, the front page shows a yellow box naming the line with the mistake. A missing comma, quote, or backtick is the usual cause.

## Check an artifact before publishing it

- This repository and the site are public. The repository also keeps every past version of every file, so deleting a file later doesn't remove it from history. Anything private belongs somewhere else.
- Some artifacts use features that exist only on claude.ai: saving what visitors do, state shared between viewers, asking Claude a question from the page, uploaded files. Those parts stop working here. Search the HTML for `window.claude`; if it appears, the page needs rework first.
- An API key, token, or password inside the HTML is readable by every visitor. Search for `key`, `token`, and `sk-` before committing.
- Artifacts that load libraries from cdnjs, jsdelivr, or unpkg keep working. An artifact made of several files needs all of them in its exhibit folder.

## See it on your own computer

Choose Code, then Download ZIP, unzip it, and double-click `index.html`. Exhibits, topics, search, and the back button all work from disk.

## Custom domain

The site is served at noahmaier.net, registered at Namecheap. The `CNAME` file in this repository holds the domain name; deleting it turns the custom domain off. The DNS records at Namecheap (Advanced DNS) are:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | maiernoah.github.io. |

GitHub's guide to custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Change the name or look

- Site name, tagline, sidebar blurb, sidebar links: top of `content.js`.
- After renaming, also change the `<title>` and description lines in `index.html` and `about.html`. Link previews in texts and Slack read those lines.
- Colors: the list at the top of `log.css`. `--page` is the background.
- About page wording: the paragraphs in `about.html`.

## Moving to another host

The site is plain files, so it runs unchanged on Netlify or Neocities. Neocities looks for its Not Found page under the name `not_found.html`, so copy `404.html` to that name there.

## Known limits

- The list of entries is built with JavaScript. Visitors with JavaScript off see a notice instead.
- There's no RSS feed. Adding one means adding a small build step that regenerates the feed with each new entry.
- The Archives list grows by one line per month.
