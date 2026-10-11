(function () {
  const SCORE_ROWS = [
    "Legacy IoT/OT",
    "Deepfake & money fraud",
    "LLM application security",
    "Backups & logging",
    "API misuse",
    "Quantum / PQC",
  ];
  const CRITERIA = ["acute", "real", "buyer"];
  const SCORE_KEY = "ct-scores";
  const DONE_KEY = "ct-q-done";

  function loadJSON(key) {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); }
    catch { return {}; }
  }
  function saveJSON(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  // --- Scores ---
  let scores = loadJSON(SCORE_KEY);
  const tbody = document.getElementById("score-body");

  function renderScores() {
    if (!tbody) return;
    tbody.innerHTML = "";
    SCORE_ROWS.forEach((row) => {
      const tr = document.createElement("tr");
      const nameTd = document.createElement("td");
      nameTd.textContent = row;
      tr.appendChild(nameTd);
      CRITERIA.forEach((k) => {
        const td = document.createElement("td");
        const wrap = document.createElement("div");
        wrap.className = "scores";
        for (let n = 1; n <= 5; n++) {
          const btn = document.createElement("button");
          btn.type = "button";
          const id = row + ":" + k;
          btn.className = "dot" + (scores[id] === n ? " on" : "");
          btn.textContent = String(n);
          btn.setAttribute("aria-label", row + " " + k + " " + n);
          btn.addEventListener("click", () => {
            if (scores[id] === n) delete scores[id];
            else scores[id] = n;
            saveJSON(SCORE_KEY, scores);
            wrap.querySelectorAll(".dot").forEach((b, i) => {
              b.classList.toggle("on", scores[id] === i + 1);
            });
          });
          wrap.appendChild(btn);
        }
        td.appendChild(wrap);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
  renderScores();

  // --- Questions ---
  let done = loadJSON(DONE_KEY);
  const progressEl = document.getElementById("q-progress");

  function updateProgress() {
    const items = document.querySelectorAll(".q-item");
    const total = items.length;
    const covered = document.querySelectorAll(".q-item.done").length;
    if (progressEl) progressEl.innerHTML = "<strong>" + covered + "</strong> / " + total + " covered";
  }

  function bindQuestions() {
    document.querySelectorAll(".q-item").forEach((item) => {
      const id = item.getAttribute("data-q");
      item.classList.toggle("done", !!done[id]);
      const btn = item.querySelector(".q-check");
      if (!btn || btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        item.classList.toggle("done");
        if (item.classList.contains("done")) done[id] = true;
        else delete done[id];
        saveJSON(DONE_KEY, done);
        updateProgress();
      });
    });
    updateProgress();
  }
  bindQuestions();

  const resetQs = document.getElementById("btn-reset-qs");
  if (resetQs) {
    resetQs.addEventListener("click", () => {
      done = {};
      saveJSON(DONE_KEY, done);
      document.querySelectorAll(".q-item.done").forEach((el) => el.classList.remove("done"));
      updateProgress();
    });
  }
  const resetScores = document.getElementById("btn-reset-scores");
  if (resetScores) {
    resetScores.addEventListener("click", () => {
      scores = {};
      saveJSON(SCORE_KEY, scores);
      renderScores();
    });
  }

  // --- Reveal on scroll ---
  const nodes = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((n) => io.observe(n));
  } else {
    nodes.forEach((n) => n.classList.add("is-in"));
  }
})();

