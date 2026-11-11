(() => {
  "use strict";
  const C = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Dates (all in IST) ---------------- */
  const TZ = "Asia/Kolkata";
  const ist = (s) => new Date(s + ":00+05:30");
  const fmt = (d, o) => new Intl.DateTimeFormat("en-IN", { timeZone: TZ, ...o }).format(d);
  const timeOf = (d) => fmt(d, { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
  const wedding = ist(C.weddingDate);
  const countdownTo = ist(C.countdownDate || C.weddingDate);

  /* ---------------- Text bindings ---------------- */
  const data = {
    ...C,
    initials: `${C.bride.name[0]} & ${C.groom.name[0]}`,
    weddingDateLong: C.heroDate || `${fmt(wedding, { weekday: "long" })} · ${fmt(wedding, { day: "numeric", month: "long", year: "numeric" })}`,
    weddingDateFull: C.coinDay ? `${C.coinDay} ${fmt(wedding, { month: "long", year: "numeric" })}` : `${fmt(wedding, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${timeOf(wedding)}`,
    coin: {
      day: C.coinDay || fmt(wedding, { day: "2-digit" }),
      month: fmt(wedding, { month: "short" }),
      year: fmt(wedding, { year: "numeric" })
    }
  };
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), data);
  $$("[data-bind]").forEach((el) => { const v = get(el.dataset.bind); if (v != null) el.textContent = v; });
  $$(".coin-face b").forEach((b) => b.textContent.length > 3 && b.classList.add("long"));
  document.title = `${C.bride.name} & ${C.groom.name} · Wedding Invitation`;

  /* ---------------- Mandala (procedural SVG) ---------------- */
  const petal = (L, W) => `M0 0C${W} ${-L * 0.35} ${W * 0.6} ${-L * 0.8} 0 ${-L}C${-W * 0.6} ${-L * 0.8} ${-W} ${-L * 0.35} 0 0Z`;
  function ring(n, r0, L, W, extra = "", off = 0) {
    let s = "";
    const d = petal(L, W);
    for (let i = 0; i < n; i++) s += `<path d="${d}" transform="rotate(${(360 / n) * i + off}) translate(0 ${-r0})" ${extra}/>`;
    return s;
  }
  function dots(n, r, size, off = 0) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = ((360 / n) * i + off) * Math.PI / 180;
      s += `<circle cx="${(Math.sin(a) * r).toFixed(2)}" cy="${(-Math.cos(a) * r).toFixed(2)}" r="${size}" fill="currentColor" stroke="none"/>`;
    }
    return s;
  }
  const MANDALA =
    `<g fill="none" stroke="currentColor" stroke-width="1">` +
    `<circle r="5" fill="currentColor"/><circle r="9"/>` +
    ring(8, 9, 20, 7) + ring(8, 9, 13, 3.5, 'fill="currentColor" fill-opacity=".35"') +
    `<circle r="31" stroke-dasharray="2 3"/>` +
    ring(16, 31, 22, 7, "", 11.25) + ring(16, 31, 14, 3, "", 11.25) +
    dots(32, 57, 1.6) +
    `<circle r="61"/>` +
    ring(24, 61, 18, 6) + ring(24, 61, 18, 6, 'stroke-opacity=".6"', 7.5) +
    `<circle r="81"/><circle r="84" stroke-dasharray="1 3"/>` +
    ring(40, 84, 12, 4, 'fill="currentColor" fill-opacity=".25"') +
    dots(40, 99, 1.4, 4.5) +
    `</g>`;
  $$("[data-mandala]").forEach((svg) => { svg.setAttribute("viewBox", "-100 -100 200 200"); svg.innerHTML = MANDALA; });

  /* ---------------- Dividers ---------------- */
  const DIVIDER = `<svg viewBox="0 0 220 26" fill="none" stroke="currentColor" stroke-width="1.2">
    <path d="M6 13H82M138 13H214"/><circle cx="4" cy="13" r="2" fill="currentColor"/><circle cx="216" cy="13" r="2" fill="currentColor"/>
    <path d="M84 13l5-4 5 4-5 4z M126 13l5-4 5 4-5 4z" fill="currentColor"/>
    <path d="M110 23c-7-4-8-11 0-20 8 9 7 16 0 20z" fill="currentColor" fill-opacity=".25"/>
    <path d="M110 23c-10 0-17-6-17-13 9 0 14 5 17 13zM110 23c10 0 17-6 17-13-9 0-14 5-17 13z"/></svg>`;
  $$(".divider").forEach((d) => (d.innerHTML = DIVIDER));

  /* ---------------- Toran (marigold garland) ---------------- */
  function buildToran(el) {
    const w = el.offsetWidth || Math.min(innerWidth, 480);
    const n = Math.max(9, Math.round(w / 26));
    const small = el.classList.contains("small");
    let html = "";
    for (let i = 0; i < n; i++) {
      const long = i % 2 === 0;
      const count = small ? (long ? 4 : 3) : (long ? 7 : 4) + (i % 4 === 0 ? 1 : 0);
      let flowers = "";
      for (let k = 0; k < count; k++) {
        const cls = k % 3 === 2 ? "red" : (k % 5 === 4 ? "white" : "");
        flowers += `<span class="flower ${cls}"></span>`;
      }
      const end = long ? `<span class="bell"></span>` : `<span class="leaf"></span>`;
      html += `<div class="strand" style="animation-delay:${(-Math.random() * 4).toFixed(2)}s">${flowers}${end}</div>`;
    }
    el.innerHTML = html;
  }
  $$("[data-toran]").forEach(buildToran);

  /* ---------------- Couple ---------------- */
  $$("[data-person]").forEach((el) => {
    const key = el.dataset.person;
    const p = C[key];
    el.classList.add(key);
    const visual = p.photo
      ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy"/>`
      : `<svg class="mandala mini-mandala" viewBox="-100 -100 200 200">${MANDALA}</svg><span class="mono">${esc(p.name[0])}</span>`;
    el.innerHTML = `<div class="arch"><div class="arch-inner">${visual}</div></div>
      <h3>${esc(p.fullName || p.name)}</h3>
      <p class="parents">${esc(p.parents)}</p>
      <p class="about">${esc(p.about || "")}</p>`;
  });

  /* ---------------- Events ---------------- */
  const ICON_CLOCK = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
  const ICON_PIN = `<svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
  const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const placeLink = (o) => o.mapUrl || mapsLink(o.mapQuery || o.venue || C.venue.name);
  const gcalStamp = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  function gcalLink(ev) {
    const s = ist(ev.start);
    const e = new Date(s.getTime() + (ev.hours || 3) * 3600e3);
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `${ev.name} · ${C.bride.name} & ${C.groom.name}`,
      dates: `${gcalStamp(s)}/${gcalStamp(e)}`,
      details: `${ev.note || ""}\nDress code: ${ev.dress || ""}`,
      location: ev.venue || C.venue.name,
      ctz: TZ
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  }
  const now = Date.now();
  $("#timeline").innerHTML = C.events.map((ev) => {
    const d = ist(ev.start);
    const past = d.getTime() + (ev.hours || 3) * 3600e3 < now;
    const sw = (ev.colors || []).map((c) => `<i style="background:${esc(c)}"></i>`).join("");
    return `<article class="ev ${esc(ev.theme || "default")} ${past ? "past" : ""} reveal">
      <div class="ev-dot">${esc(ev.icon || "✨")}</div>
      <div class="ev-card">
        <div class="ev-top"><h3>${esc(ev.name)}</h3><p class="ev-date">${fmt(d, { weekday: "long", day: "numeric", month: "short", year: "numeric" })}</p></div>
        <div class="ev-body">
          <p class="ev-note">${esc(ev.note || "")}</p>
          <div class="ev-meta">
            <div>${ICON_CLOCK}<span>${timeOf(d)} onwards</span></div>
            <div>${ICON_PIN}<span>${esc(ev.venue || C.venue.name)}</span></div>
          </div>
          ${ev.dress ? `<div class="dress"><span><b>Dress code</b>${esc(ev.dress)}</span><div class="swatches">${sw}</div></div>` : ""}
          <div class="ev-actions">
            <a class="btn sm btn-line" href="${esc(placeLink(ev))}" target="_blank" rel="noopener">Directions</a>
            <a class="btn sm btn-gold" href="${gcalLink(ev)}" target="_blank" rel="noopener">Add to Calendar</a>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");

  /* ---------------- Venue ---------------- */
  $("#dirBtn").href = placeLink(C.venue);
  const mapFrame = $("#mapFrame");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(C.venue.mapEmbed || C.venue.mapQuery || C.venue.name)}&z=15&output=embed`;

  /* ---------------- Info ---------------- */
  const infoColors = ["#ff9f1c", "#d6336c", "#0e7c7b", "#7b2cbf"];
  $("#infoGrid").innerHTML = C.info.map((it, i) =>
    `<div class="info-card reveal" style="--c:${infoColors[i % infoColors.length]};transition-delay:${i * 0.08}s">
      <div class="ico">${esc(it.icon)}</div><h4>${esc(it.title)}</h4><p>${esc(it.text)}</p>${it.phone ? `<a class="phone" href="tel:+91${esc(it.phone)}">📞 ${esc(it.phone)}</a>` : ""}</div>`).join("");

  /* ---------------- Confetti helper ---------------- */
  const PALETTE = ["#f8de9a", "#d9a443", "#ff6f9c", "#d6336c", "#ff9f1c", "#ffd23f", "#ffffff"];
  function celebrate(opts = {}) {
    if (!window.confetti || reduceMotion) return;
    const base = { colors: PALETTE, disableForReducedMotion: true, zIndex: 120 };
    confetti({ ...base, particleCount: 90, spread: 80, startVelocity: 42, origin: { y: 0.6 }, ...opts });
    setTimeout(() => confetti({ ...base, particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } }), 180);
    setTimeout(() => confetti({ ...base, particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } }), 300);
  }

  /* ---------------- Falling petals ---------------- */
  const Petals = (() => {
    const cv = $("#petals");
    const ctx = cv.getContext("2d");
    const cols = ["#ff4f7b", "#ff86a8", "#ffb11f", "#ff9408", "#fff1d6", "#e9b949", "#c2185b"];
    let W, H, list = [], running = false, raf;
    function resize() {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const make = (init) => ({
      x: Math.random() * W, y: init ? Math.random() * H : -20,
      s: 5 + Math.random() * 6, vy: 0.45 + Math.random() * 0.8,
      sw: Math.random() * 6.28, sws: 0.01 + Math.random() * 0.02, amp: 0.5 + Math.random() * 1.1,
      r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04,
      f: Math.random() * 6.28, vf: 0.02 + Math.random() * 0.035,
      c: cols[(Math.random() * cols.length) | 0]
    });
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (const p of list) {
        p.y += p.vy; p.sw += p.sws; p.x += Math.sin(p.sw) * p.amp; p.r += p.vr; p.f += p.vf;
        if (p.y > H + 20) Object.assign(p, make(false));
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(Math.cos(p.f), 1);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.ellipse(0, 0, p.s * 0.55, p.s, 0, 0, 6.283); ctx.fill();
        ctx.globalAlpha = 0.35; ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(0, -p.s * 0.8); ctx.lineTo(0, p.s * 0.8); ctx.stroke();
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduceMotion) return;
      resize();
      list = Array.from({ length: Math.min(28, Math.round(W / 16)) }, () => make(true));
      running = true; frame();
    }
    addEventListener("resize", () => running && resize());
    document.addEventListener("visibilitychange", () => {
      if (!running) return;
      if (document.hidden) cancelAnimationFrame(raf); else frame();
    });
    return { start };
  })();

  /* ---------------- Music (generated softly with Web Audio — Raag Bhupali) ---------------- */
  const Music = (() => {
    let ctx, master, timer, playing = false, nextT = 0, beat = 0, idx = 4;
    const SA = 293.66;
    const scale = [-5, -3, 0, 2, 4, 7, 9, 12, 14, 16];
    const hz = (s) => SA * Math.pow(2, s / 12);
    function voice(f, t, dur, vol, type = "sine") {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(master);
      o.start(t); o.stop(t + dur + 0.05);
    }
    function schedule() {
      while (nextT < ctx.currentTime + 0.4) {
        const drone = [hz(-5) / 2, hz(0) / 2, hz(0) / 2, hz(-12) / 2][beat % 4];
        voice(drone, nextT, 3.2, 0.05, "triangle");
        if (Math.random() < 0.62) {
          idx = Math.max(0, Math.min(scale.length - 1, idx + [-2, -1, -1, 1, 1, 2][(Math.random() * 6) | 0]));
          const f = hz(scale[idx]);
          voice(f, nextT, 2.2, 0.075, "sine");
          voice(f * 2, nextT, 0.9, 0.018, "sine");
        }
        nextT += 0.62; beat++;
      }
    }
    function init() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.0001;
      const delay = ctx.createDelay(), fb = ctx.createGain(), wet = ctx.createGain();
      delay.delayTime.value = 0.36; fb.gain.value = 0.35; wet.gain.value = 0.35;
      master.connect(ctx.destination);
      master.connect(delay); delay.connect(fb).connect(delay); delay.connect(wet).connect(ctx.destination);
      return true;
    }
    function play() {
      if (!ctx && !init()) return;
      ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 2.5);
      nextT = ctx.currentTime + 0.1;
      clearInterval(timer); timer = setInterval(schedule, 120);
      playing = true;
    }
    function pause() {
      if (!ctx) return;
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      clearInterval(timer);
      setTimeout(() => !playing && ctx.suspend(), 700);
      playing = false;
    }
    return { play, pause, toggle: () => (playing ? pause() : play(), playing), get playing() { return playing; } };
  })();

  const musicBtn = $("#musicBtn");
  musicBtn.addEventListener("click", () => musicBtn.classList.toggle("playing", Music.toggle()));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && Music.playing) { Music.pause(); musicBtn.dataset.resume = "1"; }
    else if (!document.hidden && musicBtn.dataset.resume) { delete musicBtn.dataset.resume; Music.play(); }
  });

  /* ---------------- Scroll reveal ---------------- */
  function startReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach((el, i) => {
      if (el.closest(".hero")) el.style.transitionDelay = `${0.15 * (i % 8)}s`;
      io.observe(el);
    });
    // lazy-load the map
    const mo = new IntersectionObserver(([e]) => { if (e.isIntersecting) { mapFrame.src = mapSrc; mo.disconnect(); } }, { rootMargin: "300px" });
    mo.observe(mapFrame);
  }

  /* ---------------- Dock active state ---------------- */
  const dock = $("#dock");
  const navLinks = $$("[data-nav]", dock);
  const sio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "couple", "events", "venue", "rsvp"].forEach((id) => sio.observe(document.getElementById(id)));

  /* ---------------- Gate ---------------- */
  const gate = $("#gate");
  let opened = false;
  function openGate() {
    if (opened) return;
    opened = true;
    if (C.music) { Music.play(); musicBtn.classList.add("playing"); }
    gate.classList.add("opening");
    setTimeout(() => celebrate({ origin: { y: 0.5 }, particleCount: 120 }), 500);
    setTimeout(() => { startReveal(); Petals.start(); }, 700);
    setTimeout(() => {
      gate.classList.add("gone");
      document.body.classList.remove("locked");
      dock.classList.add("show");
      musicBtn.hidden = false;
    }, 1700);
    setTimeout(() => gate.remove(), 2400);
  }
  $("#openBtn").addEventListener("click", openGate);

  /* ---------------- Scratch coins ---------------- */
  const coins = $$(".coin");
  let revealedCount = 0;
  coins.forEach((coin) => {
    const cv = $("canvas", coin);
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const size = coin.offsetWidth || 96;
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = cv.height = size * dpr;
    ctx.scale(dpr, dpr);
    // gold foil
    const g = ctx.createRadialGradient(size * 0.35, size * 0.3, 4, size / 2, size / 2, size * 0.7);
    g.addColorStop(0, "#fff3c4"); g.addColorStop(0.35, "#e9c46a"); g.addColorStop(0.7, "#c8902a"); g.addColorStop(1, "#8c5a0c");
    ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6})`;
      ctx.beginPath(); ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 1.4, 0, 6.28); ctx.fill();
    }
    ctx.strokeStyle = "rgba(122,18,54,.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2 - 8, 0, 6.28); ctx.stroke();
    ctx.fillStyle = "#6b1030"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `600 20px "Great Vibes", cursive`;
    ctx.fillText("Scratch", size / 2, size / 2 - 4);
    ctx.font = `14px serif`; ctx.fillText("✦", size / 2, size / 2 + 16);

    let down = false, last = null, moves = 0;
    const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    function scratch(p) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 26;
      ctx.beginPath(); ctx.moveTo(last ? last.x : p.x, last ? last.y : p.y); ctx.lineTo(p.x + 0.1, p.y + 0.1); ctx.stroke();
      last = p;
      if (++moves % 6 === 0) check();
    }
    function check() {
      const img = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < img.length; i += 4 * 16) { total++; if (img[i] < 40) clear++; }
      if (clear / total > 0.45) finish();
    }
    function finish() {
      if (coin.classList.contains("done")) return;
      coin.classList.add("done");
      if (navigator.vibrate) navigator.vibrate(25);
      if (++revealedCount === coins.length) {
        $("#revealed").classList.add("show");
        $("#scratchNote").hidden = true;
        celebrate();
      }
    }
    cv.addEventListener("pointerdown", (e) => { down = true; last = null; cv.setPointerCapture(e.pointerId); scratch(pos(e)); });
    cv.addEventListener("pointermove", (e) => down && scratch(pos(e)));
    const up = () => { down = false; last = null; check(); };
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
  });

  /* ---------------- Countdown ---------------- */
  const cdEls = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]'), s: $('[data-cd="s"]') };
  function tick() {
    let diff = Math.max(0, countdownTo - Date.now());
    const v = {
      d: Math.floor(diff / 864e5),
      h: Math.floor((diff / 36e5) % 24),
      m: Math.floor((diff / 6e4) % 60),
      s: Math.floor((diff / 1e3) % 60)
    };
    for (const k in v) {
      const txt = String(v[k]).padStart(2, "0");
      const el = cdEls[k];
      if (el.textContent !== txt) {
        el.textContent = txt;
        el.classList.remove("flip"); void el.offsetWidth; el.classList.add("flip");
      }
    }
    if (diff <= 0) { $("#cdDone").hidden = false; clearInterval(cdTimer); }
  }
  tick();
  const cdTimer = setInterval(tick, 1000);

  /* ---------------- RSVP ---------------- */
  const form = $("#rsvpForm");
  const out = $("#guestCount");
  const guestsField = $(".guests-field", form);
  let guests = 1;
  $$("[data-step]", form).forEach((b) => b.addEventListener("click", () => {
    guests = Math.max(1, Math.min(10, guests + Number(b.dataset.step)));
    out.textContent = guests;
  }));
  form.addEventListener("change", (e) => {
    if (e.target.name === "attend") guestsField.style.display = e.target.value === "yes" ? "" : "none";
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name") || "").trim();
    if (!name) { $("#formError").hidden = false; form.name.focus(); return; }
    $("#formError").hidden = true;
    const yes = fd.get("attend") === "yes";
    const msg = (fd.get("message") || "").trim();
    const text = [
      `🙏 RSVP — ${C.bride.name} & ${C.groom.name}'s Wedding`,
      `Name: ${name}`,
      `Attending: ${yes ? "Yes, joyfully! 🎉" : "Sorry, can't make it"}`,
      yes ? `Guests: ${guests}` : "",
      msg ? `Wishes: ${msg}` : ""
    ].filter(Boolean).join("\n");
    if (C.rsvpWhatsApp) window.open(`https://wa.me/${C.rsvpWhatsApp}?text=${encodeURIComponent(text)}`, "_blank");
    form.hidden = true;
    $("#thanks").hidden = false;
    $("#thanksText").textContent = yes
      ? `We can't wait to celebrate with you, ${name}! 💛`
      : `We'll miss you, ${name}. Thank you for your blessings 🙏`;
    if (yes) celebrate();
  });

  /* ---------------- Share ---------------- */
  const shareBtn = $("#shareBtn");
  shareBtn.addEventListener("click", async () => {
    const payload = { title: document.title, text: `You're invited to ${C.bride.name} & ${C.groom.name}'s wedding! 💐`, url: location.href };
    try {
      if (navigator.share) await navigator.share(payload);
      else { await navigator.clipboard.writeText(location.href); shareBtn.textContent = "Link copied ✓"; }
    } catch (_) { /* user cancelled */ }
  });
})();
