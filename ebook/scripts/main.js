// Basic navigation, TOC toggles, and client-side search.

(function () {
  function setActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".top-nav a[data-page]");
    links.forEach(function (link) {
      if (link.getAttribute("data-page") === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function setupTocToggles() {
    var groups = document.querySelectorAll(".toc-group");
    groups.forEach(function (group) {
      var button = group.querySelector("button");
      if (!button) return;
      button.addEventListener("click", function () {
        var collapsed = group.classList.toggle("collapsed");
        button.setAttribute("aria-expanded", String(!collapsed));
      });
    });
  }

  function loadSearchIndex(callback) {
    if (!window.fetch) {
      callback([]);
      return;
    }
    fetch("scripts/search-index.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        callback(data || []);
      })
      .catch(function () {
        callback([]);
      });
  }

  function highlightTerms(text, terms) {
    var result = text;
    terms.forEach(function (term) {
      if (!term) return;
      var re = new RegExp("(" + term.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + ")", "ig");
      result = result.replace(re, "<mark>$1</mark>");
    });
    return result;
  }

  function setupSearch() {
    var input = document.querySelector("#search-input");
    var resultsContainer = document.querySelector("#search-results");
    if (!input || !resultsContainer) return;

    loadSearchIndex(function (index) {
      function runSearch() {
        var q = input.value.trim().toLowerCase();
        resultsContainer.innerHTML = "";
        if (!q) return;
        var terms = q.split(/\s+/).filter(Boolean);

        var matches = index.filter(function (item) {
          var haystack =
            (item.title || "").toLowerCase() +
            " " +
            (item.summary || "").toLowerCase() +
            " " +
            (item.keywords || []).join(" ").toLowerCase();
          return terms.every(function (t) {
            return haystack.indexOf(t) !== -1;
          });
        });

        if (!matches.length) {
          resultsContainer.innerHTML = "<p>No results found.</p>";
          return;
        }

        var frag = document.createDocumentFragment();
        matches.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "search-result-item";
          var titleHtml = highlightTerms(item.title, terms);
          var summaryHtml = highlightTerms(item.summary, terms);
          div.innerHTML =
            '<h3><a href="' +
            item.slug +
            '">' +
            titleHtml +
            "</a></h3><p>" +
            summaryHtml +
            "</p>";
          frag.appendChild(div);
        });
        resultsContainer.appendChild(frag);
      }

      input.addEventListener("input", runSearch);
      var form = document.querySelector("#search-form");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          runSearch();
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setActiveNav();
    setupTocToggles();
    setupSearch();
  });
})();

