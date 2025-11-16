// Minimal placeholder for Prism.js / highlight.js to avoid external dependencies.
// This does not implement full syntax highlighting but keeps <pre><code class=\"language-xxx\">
// blocks styled consistently.
(function () {
  function addLanguageClass() {
    var blocks = document.querySelectorAll(\"pre code[class^='language-']\");
    blocks.forEach(function (code) {
      var pre = code.parentElement;
      if (!pre) return;
      pre.classList.add(\"code-block\");
    });
  }

  if (document.readyState === \"loading\") {
    document.addEventListener(\"DOMContentLoaded\", addLanguageClass);
  } else {
    addLanguageClass();
  }
})();

