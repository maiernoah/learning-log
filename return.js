/* ==========================================================================
   return.js : adds a small "Back to the log" button to an exhibit page.

   Paste this line just before </body> in an exhibit's index.html:

     <script src="../../return.js"></script>

   Optional: change the button text with data-label, e.g.
     <script src="../../return.js" data-label="Back to Noah's Weblog"></script>

   The button links to the exhibit's own entry on the front page.
   ========================================================================== */
(function () {
  "use strict";
  var script = document.currentScript;
  if (!script || !document.body) return;

  var label = script.getAttribute("data-label") || "Back to the log";
  var root = new URL("./", script.src);
  var target = location.protocol === "file:" ? new URL("index.html", root).href : root.href;
  var match = location.pathname.match(/\/exhibits\/([^\/]+)\//);
  if (match) target += "#" + match[1];

  var a = document.createElement("a");
  a.id = "log-return";
  a.href = target;
  a.textContent = "◄ " + label;

  // Inline styles with all:initial so the exhibit's own CSS can't restyle the button.
  var base =
    "all:initial;position:fixed;left:10px;bottom:10px;z-index:2147483647;" +
    "font:13px/1 Verdana,Geneva,Tahoma,sans-serif;color:#000;background:#c0c0c0;" +
    "padding:7px 10px 8px;cursor:pointer;text-decoration:none;" +
    "box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #dfdfdf,inset -2px -2px #808080,inset 2px 2px #fff;";
  a.setAttribute("style", base);
  a.addEventListener("focus", function () { a.style.outline = "2px dotted #000"; a.style.outlineOffset = "2px"; });
  a.addEventListener("blur", function () { a.style.outline = "none"; });

  var css = document.createElement("style");
  css.textContent = "@media print { #log-return { display: none !important; } }";
  document.head.appendChild(css);
  document.body.appendChild(a);
})();
