/* ===== Noah's Weblog video player v1 =====
   Click-to-play YouTube videos. The page shows a still frame and a Play button,
   and loads YouTube's privacy-enhanced player (youtube-nocookie.com) only when
   the reader presses Play, so pages stay fast and nothing from YouTube runs
   until someone chooses to watch.

   Markup (anywhere in the page; this script finds it):
     <figure class="yt" data-youtube="https://youtu.be/VIDEO_ID"
             data-title="What the video shows" data-length="12:30" data-start="0:00">
       <figcaption>Optional caption.</figcaption>
       <details class="transcript"><summary>Transcript</summary><p>...</p></details>
     </figure>
   data-youtube takes a bare video id or any YouTube link. data-title names the
   video for screen readers. data-length and data-start are optional ("12:30"
   or seconds); a link with ?t=90 also sets the start. Anything inside the
   figure is kept, below the player.

   For pages that add videos after loading: WeblogVideo.mount(figure) or
   WeblogVideo.mountAll(container). */
(function () {
  "use strict";

  var CSS = [
    ".yt{margin:0 0 16px;padding:0}",
    ".yt .yt-frame{position:relative;box-sizing:border-box;width:100%;aspect-ratio:16/9;background:#000;border:1px solid var(--lo,#999)}",
    "@supports not (aspect-ratio:1){.yt .yt-frame{height:0;padding-top:56.25%}}",
    ".yt .yt-frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0}",
    ".yt .yt-frame>button.yt-play,.yt .yt-frame>button.yt-play:active{position:absolute;top:0;left:0;width:100%;height:100%;",
    "  margin:0;padding:0;border:0;border-radius:0;background:#000;box-shadow:none;cursor:pointer;display:block;overflow:hidden}",
    ".yt .yt-play img{width:100%;height:100%;object-fit:cover;display:block}",
    ".yt .yt-label{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;",
    "  font:bold 15px/1.2 Verdana,Geneva,Tahoma,sans-serif;color:#000;background:var(--btn,#c0c0c0);padding:10px 18px;",
    "  box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf}",
    ".yt .yt-play:hover .yt-label{background:#d4d4d4}",
    ".yt .yt-play:active .yt-label{box-shadow:inset 1px 1px #0a0a0a,inset -1px -1px #fff,inset 2px 2px #808080,inset -2px -2px #dfdfdf}",
    ".yt .yt-play:focus-visible{outline:2px dotted var(--ink,#000);outline-offset:3px}",
    ".yt .yt-note{font:12px/1.5 Verdana,Geneva,Tahoma,sans-serif;color:var(--ink-soft,#2b2b2b);margin:4px 0 0}",
    ".yt figcaption{margin-top:6px}",
    ".yt details.transcript{margin-top:8px}",
    ".yt details.transcript summary{cursor:pointer;font:13px/1.5 Verdana,Geneva,Tahoma,sans-serif}",
    ".yt details.transcript p{font-size:0.95em}"
  ].join("\n");

  function injectStyles() {
    if (document.getElementById("weblog-video-css")) return;
    var s = document.createElement("style");
    s.id = "weblog-video-css";
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  // A bare 11-character id, or any common YouTube address.
  function idFrom(value) {
    var v = String(value || "").trim();
    var m = v.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/|\/v\/)([\w-]{11})(?![\w-])/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(v) ? v : null;
  }

  // "1:02:03", "12:30" or "90" -> seconds
  function seconds(value) {
    var parts = String(value || "").trim().split(":").map(function (x) { return parseInt(x, 10); });
    if (!parts.length || parts.some(isNaN)) return 0;
    return parts.reduce(function (total, n) { return total * 60 + n; }, 0);
  }

  function mount(fig) {
    if (!fig || fig._ytMounted) return;
    fig._ytMounted = true;
    injectStyles();
    if (!fig.classList.contains("yt")) fig.classList.add("yt");
    var id = idFrom(fig.getAttribute("data-youtube"));
    var note = document.createElement("p");
    note.className = "yt-note";
    if (!id) {
      note.textContent = "This video's link isn't a YouTube address, so it can't be shown.";
      fig.insertBefore(note, fig.firstChild);
      return;
    }
    var title = fig.getAttribute("data-title") || "Video";
    var length = (fig.getAttribute("data-length") || "").trim();
    var t = String(fig.getAttribute("data-youtube")).match(/[?&#](?:t|start)=(\d+)s?(?:&|$)/);
    var start = seconds(fig.getAttribute("data-start")) || (t ? +t[1] : 0);  // or a ?t=90 in the link

    var frame = document.createElement("div");
    frame.className = "yt-frame";
    var play = document.createElement("button");
    play.type = "button";
    play.className = "yt-play";
    play.setAttribute("aria-label", "Play video: " + title + (length ? " (" + length + ")" : ""));
    var still = document.createElement("img");
    still.alt = "";
    still.loading = "lazy";
    still.decoding = "async";
    still.width = 480;
    still.height = 360;
    still.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    var label = document.createElement("span");
    label.className = "yt-label";
    label.setAttribute("aria-hidden", "true");
    label.textContent = "► Play" + (length ? "  " + length : "");
    play.appendChild(still);
    play.appendChild(label);
    frame.appendChild(play);

    var watch = "https://www.youtube.com/watch?v=" + id + (start ? "&t=" + start + "s" : "");
    note.appendChild(document.createTextNode("Plays from YouTube. "));
    var a = document.createElement("a");
    a.href = watch;
    a.textContent = "Watch on YouTube instead";
    note.appendChild(a);

    play.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1" + (start ? "&start=" + start : "");
      f.title = title;
      f.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      f.setAttribute("allowfullscreen", "");
      f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");  // YouTube refuses embeds that send no referrer
      frame.replaceChild(f, play);
      f.focus();
    });

    fig.insertBefore(note, fig.firstChild);
    fig.insertBefore(frame, note);
  }

  function mountAll(root) {
    [].forEach.call((root || document).querySelectorAll("[data-youtube]"), mount);
  }

  window.WeblogVideo = { mount: mount, mountAll: mountAll, idFrom: idFrom, version: 1 };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mountAll(); });
  else mountAll();
})();
