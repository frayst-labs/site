// frayst.com: theme toggle and the task-grid readout. Everything else is plain HTML.
(function () {
  var root = document.documentElement;
  function stored() { try { return localStorage.getItem("theme"); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem("theme", v); } catch (e) {} }
  function current() {
    return root.dataset.theme || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  var saved = stored();
  if (saved) root.dataset.theme = saved;

  document.addEventListener("DOMContentLoaded", function () {
    var btns = document.querySelectorAll("button.theme");
    function label() {
      var dark = current() === "dark";
      btns.forEach(function (b) { b.setAttribute("aria-checked", dark ? "true" : "false"); if (!b.classList.contains("switch")) b.textContent = dark ? "Light" : "Dark"; });
    }
    label();
    btns.forEach(function (b) { b.addEventListener("click", function () { var next = current() === "dark" ? "light" : "dark"; root.dataset.theme = next; store(next); label(); }); });

    var grid = document.querySelector(".tasks"), out = document.querySelector(".readout");
    if (grid && out) {
      var words = { h: "a wrong answer got full marks", k: "the grader held", b: "not counted yet, being re-checked" };
      function show(e) {
        var t = e.target; if (t.tagName !== "I") return;
        var n = +t.dataset.n, s = "Task " + t.dataset.i + " of " + grid.children.length + " · difficulty tier " + t.dataset.t + " · " + words[t.dataset.o];
        if (t.dataset.o === "h") s += " (" + n + " proven finding" + (n === 1 ? "" : "s") + ")";
        out.textContent = s;
      }
      grid.addEventListener("mouseover", show);
      grid.addEventListener("focusin", show);
    }
  });
})();
