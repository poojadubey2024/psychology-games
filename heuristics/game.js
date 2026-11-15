(function () {
  "use strict";

  var D = window.GAME_DATA;
  var IMG_ROOT = "img/";
  var LEVELS = ["Novice", "Thinker", "Mind Reader", "Shortcut Spotter", "Master of Minds"];
  var RULES = { start: 10, hint: -5, wrongLabel: -10, wrongBox: -10, heuristic: 20, schema: 25 };
  var STORE_KEY = "pg-heuristics-v1";

  // ---------- saved progress ----------
  var save = { funnel: RULES.start, level: 0, done: [] };
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) { var s = JSON.parse(raw); if (s && typeof s.funnel === "number") save = s; }
  } catch (e) { /* storage blocked: play without saving */ }
  function persist() { try { localStorage.setItem(STORE_KEY, JSON.stringify(save)); } catch (e) {} }

  // ---------- helpers ----------
  var app = document.getElementById("app");
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function imgUrl(storyIdx, file) {
    if (!file) return null;
    return IMG_ROOT + "s" + (storyIdx + 1) + "/" + encodeURIComponent(file);
  }
  function storyImages(i) {
    var im = D.stories[i].images || {};
    var panels = im.panels || ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
    return {
      panels: panels.map(function (f) { return imgUrl(i, f); }),
      mind: imgUrl(i, im.mind || "mind.jpg"),
      sheet: imgUrl(i, im.sheet || "sheet.jpg"),
      label: imgUrl(i, im.label || panels[2] || panels[0])
    };
  }
  // An <img> that falls back to a soft placeholder if the file is missing.
  function picture(url, fallbackHtml) {
    var ph = '<div class="placeholder">' + fallbackHtml + "</div>";
    if (!url) return ph;
    return '<img src="' + esc(url) + '" alt="" onerror="this.outerHTML=this.dataset.ph" data-ph="' + esc(ph) + '">';
  }
  var ICON = {
    back: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M11 3L5 9l6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    brain: '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 3 5h1V3zM13 3a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-3 5h-1V3z" fill="none" stroke="#3D5DA8" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    bulb: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 2a5 5 0 0 0-3 9v2h6v-2a5 5 0 0 0-3-9zM7 16h4" fill="none" stroke="#B8476F" stroke-width="1.6" stroke-linecap="round"/></svg>',
    close: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="#22264B" stroke-width="1.8" stroke-linecap="round"/></svg>',
    check: '<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M10 21l7 7 14-15" fill="none" stroke="#22264B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    grip: '<svg width="14" height="20" viewBox="0 0 14 20" aria-hidden="true"><g fill="#8C90AE"><circle cx="4" cy="4" r="1.6"/><circle cx="10" cy="4" r="1.6"/><circle cx="4" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="4" cy="16" r="1.6"/><circle cx="10" cy="16" r="1.6"/></g></svg>',
    mind: '<svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="#fff"/><path d="M20 12a7 7 0 0 0-7 7 7 7 0 0 0-2 11 7 7 0 0 0 8 10h7V12zM36 12a7 7 0 0 1 7 7 7 7 0 0 1 2 11 7 7 0 0 1-8 10h-7V12z" fill="none" stroke="#B8476F" stroke-width="2" stroke-linejoin="round"/></svg>',
    logo: '<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#FFFFFF" stroke="#E7C3D2"/><path d="M8 11H32L23 22V31H17V22Z" fill="none" stroke="#22264B" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 15H28L22 21.5V29H18V21.5Z" fill="#E58BAE" opacity=".6"/></svg>'
  };

  // ---------- funnel ----------
  var FUNNEL_PATH = "M10 10H170L108 210V360H72V210Z";
  function liquidY(p) { return 360 - Math.max(0, Math.min(100, p)) / 100 * 350; }
  function funnelHtml() {
    var y = liquidY(save.funnel);
    return '<div class="funnel-col" id="funnel">' +
      '<span class="eyebrow muted">Insight funnel</span>' +
      '<div style="position:relative">' +
      '<svg class="funnel-svg" viewBox="0 0 180 420" role="img" aria-label="Funnel ' + save.funnel + ' percent full">' +
      '<defs><clipPath id="fclip"><path d="' + FUNNEL_PATH + '"/></clipPath>' +
      '<linearGradient id="fliq" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#6F8FD8"/><stop offset="1" stop-color="#E58BAE"/></linearGradient></defs>' +
      '<path d="' + FUNNEL_PATH + '" fill="rgba(255,255,255,0.75)"/>' +
      '<g clip-path="url(#fclip)"><rect id="liq" class="liquid" x="0" y="' + y + '" width="180" height="' + (380 - y) + '" fill="url(#fliq)"/>' +
      '<path id="wave" d="M0 0c20-8 40 8 60 0s40-8 60 0 40 8 60 0" transform="translate(0 ' + (y + 2) + ')" fill="none" stroke="#fff" stroke-width="2" stroke-opacity=".75" style="transition:transform 1.2s cubic-bezier(.3,.7,.3,1)"/></g>' +
      '<path d="' + FUNNEL_PATH + '" fill="none" stroke="#22264B" stroke-width="2" stroke-linejoin="round"/>' +
      '<g id="fx"></g></svg></div>' +
      '<span class="pct" id="pct">' + save.funnel + '%</span>' +
      '<span class="lvl">Level ' + (save.level + 1) + ' · ' + LEVELS[Math.min(save.level, LEVELS.length - 1)] + '</span></div>';
  }
  function changeFunnel(delta) {
    var before = save.funnel;
    save.funnel = Math.max(0, Math.min(100, save.funnel + delta));
    persist();
    var liq = document.getElementById("liq");
    if (liq) {
      var y = liquidY(save.funnel);
      liq.setAttribute("y", y); liq.setAttribute("height", 380 - y);
      var wave = document.getElementById("wave"); if (wave) wave.setAttribute("transform", "translate(0 " + (y + 2) + ")");
      var pct = document.getElementById("pct"); if (pct) pct.textContent = save.funnel + "%";
      var fx = document.getElementById("fx");
      if (fx) {
        if (delta > 0) {
          fx.innerHTML = '<rect class="stream" x="86" y="-30" width="8" height="' + (y + 30) + '" rx="4" fill="#E58BAE" style="transform-origin:90px -30px"/>';
        } else {
          fx.innerHTML = '<circle class="drip" cx="90" cy="368" r="6" fill="#6F8FD8"/><circle class="drip" cx="90" cy="380" r="4" fill="#E58BAE" style="animation-delay:.25s"/>';
        }
        setTimeout(function () { if (fx) fx.innerHTML = ""; }, 1300);
      }
      var holder = liq.closest("div");
      if (holder) {
        var tag = document.createElement("span");
        tag.className = "delta " + (delta > 0 ? "up" : "down");
        tag.textContent = (delta > 0 ? "+" : "") + delta + "%";
        tag.style.left = "120px"; tag.style.top = "40px";
        holder.appendChild(tag);
        setTimeout(function () { tag.remove(); }, 1700);
      }
    }
    if (save.funnel === 0 && before > 0) toast("The funnel ran dry. Keep playing to refill it!");
    return save.funnel;
  }

  // ---------- overlays ----------
  function modal(html, cls, onClose) {
    var ov = document.createElement("div");
    ov.className = "overlay";
    ov.innerHTML = '<div class="modal ' + (cls || "") + '" role="dialog" aria-modal="true">' + html + "</div>";
    document.body.appendChild(ov);
    function close() { ov.remove(); document.removeEventListener("keydown", onKey); if (onClose) onClose(); }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    var c = ov.querySelector("[data-close]"); if (c) c.addEventListener("click", close);
    var first = ov.querySelector("button"); if (first) first.focus();
    return { el: ov, close: close };
  }
  function psychModal(title, body, people) {
    modal('<button class="icon-btn close" data-close aria-label="Close">' + ICON.close + '</button>' +
      '<span class="eyebrow" style="color:var(--blue)">Psychology behind it</span>' +
      "<h2>" + esc(title) + "</h2><p>" + esc(body) + "</p>" +
      (people ? '<div class="people"><b>Psychologists:</b> ' + esc(people) + "</div>" : ""));
  }
  function toast(msg) {
    var t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  }
  function confetti() {
    var cv = document.createElement("canvas"); cv.id = "confetti";
    cv.width = innerWidth; cv.height = innerHeight; document.body.appendChild(cv);
    var ctx = cv.getContext("2d");
    var colors = ["#E58BAE", "#6F8FD8", "#F2C46D", "#B79BE0", "#F7B7CC", "#9CC3F0"];
    var bits = [];
    for (var i = 0; i < 160; i++) {
      bits.push({ x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight / 2.4, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 4, s: 6 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: colors[i % colors.length], round: i % 3 === 0 });
    }
    var start = performance.now();
    (function frame(t) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      bits.forEach(function (b) {
        b.vy += 0.35; b.vx *= 0.99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
        if (b.round) { ctx.beginPath(); ctx.arc(0, 0, b.s / 2, 0, 6.3); ctx.fill(); } else ctx.fillRect(-b.s / 2, -b.s, b.s, b.s * 1.8);
        ctx.restore();
      });
      if (t - start < 3200) requestAnimationFrame(frame); else cv.remove();
    })(start);
  }

  // ---------- header ----------
  function header(sub) {
    return '<header class="top"><a class="brand" href="#" data-home>' + ICON.logo +
      '<span><span class="brand-title" style="display:block">Shortcuts of the Mind</span><span class="brand-sub">' + esc(sub || "Psychology Games · Heuristics & Schemas") + "</span></span></a>" +
      '<div class="top-right"><a class="link-btn" href="../index.html">All games</a>' +
      '<span class="pill">Level ' + (save.level + 1) + " · " + LEVELS[Math.min(save.level, LEVELS.length - 1)] + ' · Funnel <span id="mini">' + save.funnel + "%</span></span></div></header>";
  }
  function wireHome() {
    app.querySelectorAll("[data-home]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); home(); }); });
  }

  // ---------- HOME ----------
  function home() {
    var cards = D.stories.map(function (s, i) {
      var done = save.done.indexOf(i) >= 0;
      var url = storyImages(i).panels[0];
      var style = url ? ' style="background-image:url(\'' + url.replace(/'/g, "%27") + '\'), linear-gradient(160deg,#F9D7E3,#D8E6F8)"' : "";
      return '<button class="story-card" data-story="' + i + '"><div class="thumb ' + (i % 2 ? "blue" : "pink") + '"' + style + '>' +
        '<span class="tag">Story ' + (i + 1) + "</span>" + (done ? '<span class="tag dark">Played</span>' : "") + "</div>" +
        '<span class="t">' + esc(s.title) + '</span><span class="w">Key character: ' + esc(s.who) + "</span></button>";
    }).join("");
    var minds = D.minds.map(function (m, i) { return '<span class="mind-chip"><span class="mind-dot" style="background:' + (i % 2 ? "#D8E6F8" : "#F9D7E3") + '"></span>' + esc(m) + "</span>"; }).join("");
    app.innerHTML = header() +
      '<section class="hero"><div><h1>Choose a story. Catch the shortcut.</h1><p>Watch what happens, read the character\'s mind, and fill your funnel with insight.</p></div>' +
      '<span class="muted">' + save.done.length + " of " + D.stories.length + " played</span></section>" +
      '<section class="story-grid">' + cards + "</section>" +
      '<section class="hall"><h2>Hall of Minds</h2>' + minds + "</section>";
    wireHome();
    app.querySelectorAll("[data-story]").forEach(function (b) { b.addEventListener("click", function () { startStory(+b.dataset.story); }); });
    // Thumbnails whose image is missing keep their gradient (CSS background fallback).
  }

  // ---------- STORY ----------
  var cur = null; // current play state
  function startStory(i) {
    cur = { i: i, panel: 0, seen: [true, false, false, false, false], labelHintUsed: false, hHintUsed: false, sHintUsed: false, gained: 0, wrong: 0, hints: 0 };
    renderPanel();
    window.scrollTo(0, 0);
  }
  function renderPanel() {
    var s = D.stories[cur.i], p = s.panels[cur.panel], imgs = storyImages(cur.i);
    cur.seen[cur.panel] = true;
    var body;
    if (p.lines) {
      body = '<div style="display:flex;flex-direction:column;gap:10px">' + p.lines.map(function (l, k) {
        var right = l[0] !== s.who && k % 1 === 0 && l[0] !== p.lines[0][0] ? true : (l[0] !== s.who);
        return '<div class="bubble' + (right ? " right" : "") + '" style="animation-delay:' + (k * 0.5) + 's"><b>' + esc(l[0]) + ":</b> " + esc(l[1]) + "</div>";
      }).join("") + "</div>";
    } else {
      body = '<p class="panel-text">' + esc(p.text) + "</p>";
    }
    var dots = s.panels.map(function (_, k) { return "<span class=\"" + (k === cur.panel ? "on" : (cur.seen[k] ? "seen" : "")) + "\"></span>"; }).join("");
    var strip = s.panels.map(function (pp, k) { return '<button data-go="' + k + '" class="' + (k === cur.panel ? "on" : (cur.seen[k] ? "seen" : "")) + '">' + (k + 1) + " · " + esc(pp.kind) + "</button>"; }).join("");
    var last = cur.panel === s.panels.length - 1;
    app.innerHTML = header("Story " + (cur.i + 1) + " · " + s.title) +
      '<div class="story-layout"><div class="frame">' + picture(imgs.panels[cur.panel], '<span class="eyebrow">Panel ' + (cur.panel + 1) + " · " + esc(p.kind) + '</span><span class="big">Picture coming soon</span><span>Read the panel on the right</span>') + "</div>" +
      '<div class="panel-card"><span class="eyebrow" style="color:var(--rose)">Panel ' + (cur.panel + 1) + " of " + s.panels.length + " · " + esc(p.kind) + "</span>" + body +
      (cur.panel === 0 ? '<p class="muted">Key character: ' + esc(s.about) + "</p>" : "") +
      (last ? '<p class="muted">Ready? Next you\'ll name what ' + esc(s.who) + " concluded.</p>" : "") +
      '<div class="dots">' + dots + "</div>" +
      '<div class="nav-row"><button class="btn btn-light" data-prev ' + (cur.panel === 0 ? "disabled" : "") + ">Back</button>" +
      '<button class="btn btn-dark" data-next>' + (last ? "Label " + esc(s.who) + "’s conclusion" : "Next panel") + "</button></div></div></div>" +
      '<div class="strip">' + strip + "</div>";
    wireHome();
    app.querySelector("[data-prev]").addEventListener("click", function () { if (cur.panel > 0) { cur.panel--; renderPanel(); } });
    app.querySelector("[data-next]").addEventListener("click", function () { if (last) renderLabel(); else { cur.panel++; renderPanel(); } });
    app.querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { cur.panel = +b.dataset.go; renderPanel(); }); });
  }

  // ---------- LABEL ----------
  function renderLabel() {
    var s = D.stories[cur.i], imgs = storyImages(cur.i);
    var labels = shuffle(s.labels);
    app.innerHTML = header("Story " + (cur.i + 1) + " · " + s.title) +
      '<div class="step-head"><span class="muted">Step 1 of 3</span><h1>' + esc(s.labelQ) + "</h1></div>" +
      '<div class="play"><div class="label-layout"><div class="frame drop-frame">' + picture(imgs.label, '<span class="big">' + esc(s.who) + "</span>") +
      '<div class="dropzone" id="drop">Drop a label on ' + esc(s.who) + "</div></div>" +
      '<div style="display:flex;flex-direction:column;gap:16px"><p class="muted" style="margin:0;font-size:16px;line-height:1.5">Drag the label that matches ' + esc(s.who) + "’s conclusion onto the picture. A wrong label bounces back and leaks 10%.</p>" +
      '<div class="chips">' + labels.map(function (l) { return '<button class="chip" data-label="' + esc(l) + '">' + ICON.grip + "<span>" + esc(l) + "</span></button>"; }).join("") + "</div>" +
      '<div class="hint-row"><button class="btn btn-soft-rose" data-hint>' + ICON.bulb + " Hint · costs 5%</button>" +
      '<button class="btn btn-light" data-replay>Replay the story</button></div><div id="hintOut"></div></div></div>' + funnelHtml() + "</div>";
    wireHome();
    var drop = document.getElementById("drop");
    app.querySelector("[data-replay]").addEventListener("click", function () { cur.panel = 0; renderPanel(); });
    app.querySelector("[data-hint]").addEventListener("click", function () {
      if (!cur.labelHintUsed) { cur.labelHintUsed = true; cur.hints++; changeFunnel(RULES.hint); updateMini(); }
      document.getElementById("hintOut").innerHTML = '<div class="hint-box">' + ICON.bulb + " " + esc(s.labelHint) + "</div>";
    });
    var solved = false;
    function tryLabel(chip) {
      if (solved || chip.classList.contains("used")) return;
      var val = chip.dataset.label;
      if (val === s.answer) {
        solved = true;
        drop.textContent = val; drop.classList.add("done");
        chip.classList.add("used");
        toast("Yes! That's what " + s.who + " concluded.");
        setTimeout(renderHeuristic, 1200);
      } else {
        cur.wrong++; changeFunnel(RULES.wrongLabel); updateMini();
        chip.classList.remove("wrong"); void chip.offsetWidth; chip.classList.add("wrong");
      }
    }
    app.querySelectorAll(".chip").forEach(function (chip) {
      var ghost = null, moved = false, sx = 0, sy = 0;
      chip.addEventListener("pointerdown", function (e) {
        if (solved) return;
        sx = e.clientX; sy = e.clientY; moved = false;
        chip.setPointerCapture(e.pointerId);
      });
      chip.addEventListener("pointermove", function (e) {
        if (!chip.hasPointerCapture(e.pointerId)) return;
        if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) {
          moved = true;
          var r = chip.getBoundingClientRect();
          ghost = chip.cloneNode(true); ghost.classList.add("ghost"); ghost.style.width = r.width + "px";
          document.body.appendChild(ghost);
          chip.classList.add("placeholder-slot");
        }
        if (moved && ghost) {
          ghost.style.left = (e.clientX - 60) + "px"; ghost.style.top = (e.clientY - 40) + "px";
          var d = drop.getBoundingClientRect();
          var over = e.clientX > d.left - 40 && e.clientX < d.right + 40 && e.clientY > d.top - 40 && e.clientY < d.bottom + 60;
          drop.classList.toggle("hot", over);
        }
      });
      chip.addEventListener("pointerup", function (e) {
        if (!moved) return; // a plain click is handled by "click"
        var d = drop.getBoundingClientRect();
        var over = e.clientX > d.left - 40 && e.clientX < d.right + 40 && e.clientY > d.top - 40 && e.clientY < d.bottom + 60;
        if (ghost) ghost.remove(); ghost = null;
        chip.classList.remove("placeholder-slot"); drop.classList.remove("hot");
        if (over) tryLabel(chip);
      });
      // Keyboard / tap fallback: choosing a label places it.
      chip.addEventListener("click", function () { if (!moved) tryLabel(chip); moved = false; });
    });
  }
  function updateMini() { var m = document.getElementById("mini"); if (m) m.textContent = save.funnel + "%"; }

  // ---------- GRIDS (heuristic, schema) ----------
  function renderHeuristic() { renderGrid("heuristic"); }
  function renderSchema() { renderGrid("schema"); }
  function renderGrid(kind) {
    var s = D.stories[cur.i], imgs = storyImages(cur.i);
    var isH = kind === "heuristic";
    var options = shuffle(isH ? s.heuristics : s.schemas);
    var catalog = isH ? D.heuristics : D.schemas;
    var tried = {};
    var busy = false;
    var correctName = options.filter(function (o) { return o[2]; })[0][0];
    var heurName = s.heuristics.filter(function (o) { return o[2]; })[0][0];
    app.innerHTML = header("Story " + (cur.i + 1) + " · " + s.title) +
      '<div class="step-head"><span class="muted">Step ' + (isH ? 2 : 3) + ' of 3</span><h1>' +
      (isH ? "Which shortcut did " + esc(s.who) + "’s mind take?" : "Which schema fed the " + esc(heurName.toLowerCase()) + " shortcut?") + "</h1></div>" +
      '<div class="play"><div><div class="grid-layout"><div class="boxes">' +
      options.map(function (o, k) {
        return '<div class="box" data-k="' + k + '"><span class="eyebrow muted" data-state>Closed</span><span class="name">' + esc(o[0]) + (isH ? "" : " schema") + "</span>" +
          '<div class="row"><button class="open-btn" data-open="' + k + '">Open</button>' +
          '<button class="icon-btn brain" data-psy="' + k + '" aria-label="Psychology behind ' + esc(o[0]) + '">' + ICON.brain + "</button></div></div>";
      }).join("") + "</div>" +
      '<div class="stage" id="stage"><div class="stage-idle">' + ICON.mind + '<span class="serif" style="font-size:22px;color:var(--ink)">Open a box to look inside ' + esc(s.who) + "’s mind</span><span>A match fills your funnel (" + (isH ? "+20%" : "+25%") + "). A mismatch leaks 10%.</span></div></div></div>" +
      '<div class="hint-row"><button class="btn btn-soft-rose" data-hint>' + ICON.bulb + " Hint · costs 5%</button><span class=\"muted\">Wrong box −10% · Hint −5% · Correct " + (isH ? "+20%" : "+25%") + "</span></div><div id=\"hintOut\" style=\"margin-top:12px\"></div></div>" +
      funnelHtml() + "</div>";
    wireHome();

    app.querySelector("[data-hint]").addEventListener("click", function () {
      var used = isH ? "hHintUsed" : "sHintUsed";
      if (!cur[used]) { cur[used] = true; cur.hints++; changeFunnel(RULES.hint); updateMini(); }
      document.getElementById("hintOut").innerHTML = '<div class="hint-box">' + ICON.bulb + " " + esc(isH ? s.hintH : s.hintS) + "</div>";
    });
    app.querySelectorAll("[data-psy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var o = options[+b.dataset.psy], c = catalog[o[0]] || {};
        psychModal(o[0] + (isH ? " heuristic" : " schema"), c.def || "", c.people || "");
      });
    });
    app.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = +b.dataset.open, o = options[k];
        if (busy || tried[k]) return;
        busy = true;
        app.querySelectorAll(".box").forEach(function (x) { x.classList.remove("active"); });
        var box = app.querySelector('.box[data-k="' + k + '"]');
        box.classList.add("active");
        box.querySelector("[data-state]").textContent = "Playing…";
        var stage = document.getElementById("stage");
        var art = o[2] ? picture(imgs.mind, ICON.mind + '<span>Inside ' + esc(s.who) + "’s mind</span>")
          : '<div class="placeholder">' + ICON.mind + "<span>Inside " + esc(s.who) + "’s mind: testing “" + esc(o[0]) + "”</span></div>";
        stage.innerHTML = '<div class="frame">' + art + '</div><div class="stage-body"><span class="eyebrow" style="color:var(--blue)" id="verdict">Looking inside…</span><p class="stage-text" id="typed"></p><div id="after"></div></div>';
        typeText(document.getElementById("typed"), o[1], function () {
          tried[k] = true;
          var verdict = document.getElementById("verdict"), after = document.getElementById("after");
          if (o[2]) {
            verdict.textContent = "It's a match!"; verdict.style.color = "var(--rose)";
            box.classList.remove("active"); box.classList.add("win");
            box.querySelector("[data-state]").textContent = "Match · +" + (isH ? RULES.heuristic : RULES.schema) + "%";
            b.disabled = true;
            cur.gained += isH ? RULES.heuristic : RULES.schema;
            changeFunnel(isH ? RULES.heuristic : RULES.schema); updateMini();
            setTimeout(function () { if (isH) celebrateHeuristic(o[0]); else finishStory(o[0]); }, 1300);
          } else {
            verdict.textContent = "Not this one"; verdict.style.color = "var(--rose-deep)";
            box.classList.remove("active"); box.classList.add("tried");
            box.querySelector("[data-state]").textContent = "Tried · leaked 10%";
            b.disabled = true;
            cur.wrong++;
            changeFunnel(RULES.wrongBox); updateMini();
            after.innerHTML = '<span class="muted">Try another box, or take the hint.</span>';
            busy = false;
          }
        });
      });
    });

    function celebrateHeuristic(name) {
      confetti();
      var m = modal('<div class="badge-circle">' + ICON.check + "</div><h2>Brilliant catch!</h2>" +
        "<p>You spotted the <b>" + esc(name.toLowerCase()) + " heuristic</b>. Funnel now " + save.funnel + "%.</p>" +
        '<div class="actions"><button class="btn btn-soft-rose" data-psy-story>' + ICON.brain + " Psychology behind it</button>" +
        '<button class="btn btn-dark" data-next>Now match the schema</button></div>', "center");
      m.el.querySelector("[data-psy-story]").addEventListener("click", function () {
        psychModal("Why " + s.who + " did this", s.psychology, (D.heuristics[name] || {}).people);
      });
      m.el.querySelector("[data-next]").addEventListener("click", function () { m.close(); renderSchema(); });
    }
  }

  function typeText(el, text, done) {
    var i = 0, speed = Math.max(12, Math.min(28, 2400 / text.length));
    (function step() {
      i += 2; el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(step, speed); else { el.textContent = text; setTimeout(done, 400); }
    })();
  }

  // ---------- DONE ----------
  function finishStory(schemaName) {
    var s = D.stories[cur.i];
    var heur = s.heuristics.filter(function (o) { return o[2]; })[0][0];
    if (save.done.indexOf(cur.i) < 0) save.done.push(cur.i);
    persist();
    confetti();
    var full = save.funnel >= 100;
    var next = (cur.i + 1) % D.stories.length;
    app.innerHTML = header("Story " + (cur.i + 1) + " · " + s.title) +
      '<div class="play"><div class="done-card"><span class="eyebrow" style="color:var(--rose)">Story complete</span>' +
      "<h1>" + esc(s.title) + "</h1>" +
      '<div class="summary"><div><div class="k">Label</div><div class="v">' + esc(s.answer) + '</div></div><div><div class="k">Heuristic</div><div class="v">' + esc(heur) + '</div></div><div><div class="k">Schema</div><div class="v">' + esc(schemaName) + "</div></div></div>" +
      '<div class="hint-box" style="background:#F2F6FD;border-color:#D5DFF3"><b>Reality check:</b> ' + esc(s.reality) + "</div>" +
      '<p style="line-height:1.6;color:#3B4066">' + esc(s.psychology) + "</p>" +
      '<p class="muted">This story: +' + cur.gained + "% from answers, " + cur.wrong + " wrong " + (cur.wrong === 1 ? "try" : "tries") + ", " + cur.hints + " " + (cur.hints === 1 ? "hint" : "hints") + ".</p>" +
      '<div class="nav-row" style="max-width:520px"><button class="btn btn-light" data-home2>All stories</button><button class="btn btn-dark" data-nextstory>Next story</button></div></div>' +
      funnelHtml() + "</div>";
    wireHome();
    app.querySelector("[data-home2]").addEventListener("click", home);
    app.querySelector("[data-nextstory]").addEventListener("click", function () { startStory(next); });
    if (full) setTimeout(levelUp, 900);
  }

  function levelUp() {
    var newLevel = Math.min(save.level + 1, LEVELS.length - 1);
    confetti();
    var m = modal('<div class="badge-circle">' + ICON.check + "</div><span class=\"eyebrow\" style=\"color:var(--rose)\">Funnel full!</span>" +
      "<h2>You're now a " + esc(LEVELS[newLevel]) + "</h2><p>Your insight funnel is full. It empties to 10% for the next level, so keep playing to practise more shortcuts.</p>" +
      '<div class="actions"><button class="btn btn-dark" data-close>Start level ' + (newLevel + 1) + "</button></div>", "center", function () {
        save.level = newLevel; save.funnel = RULES.start; persist();
        var liq = document.getElementById("liq"); if (liq) { changeFunnel(0); }
        var f = document.getElementById("funnel"); if (f) f.outerHTML = funnelHtml();
        updateMini();
      });
  }

  home();
})();
