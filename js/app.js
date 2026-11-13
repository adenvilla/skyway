/* Skyway Forwarders — front-end behaviour for the multi-page build */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const D = () => (window.SKYWAY_I18N || {});
  const lang = () => document.documentElement.lang || "en";
  const t = (key) => (D()[lang()] && D()[lang()][key]) || (D().en && D().en[key]) || "";
  const KES = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });
  const money = (n) => "KSh " + KES.format(Math.round(n / 100) * 100);
  const WHATSAPP = "254720000213";

  /* ───────── header + mobile nav ───────── */
  const header = $("#header");
  const menuBtn = $("#menuBtn");
  const nav = $("#nav");

  if (header) {
    /* the home hero runs underneath the header, so the header starts transparent
       and solidifies on the first scroll */
    const darkTop = $(".hero") || $(".page-head");
    const home = !!darkTop;
    const measure = () => {
      if (!home) return;
      document.documentElement.style.setProperty("--head-h", header.offsetHeight + "px");
    };
    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      if (home) document.body.toggleAttribute("data-over-hero", window.scrollY <= 8);
    };
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }

  const closeNav = () => {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) closeNav(); });
  }

  /* ───────── active nav state from body[data-page] ───────── */
  const pageId = document.body.dataset.page;
  if (pageId && nav) {
    $$(".nav__link", nav).forEach((a) => {
      const target = (a.getAttribute("href") || "").replace(".html", "");
      if (target === pageId) a.setAttribute("aria-current", "page");
    });
  }

  /* ───────── reveal on scroll ───────── */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 4, 3) * 60 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ───────── contact dock: WeChat ID copy ───────── */
  const wxBtn = $("#wechatBtn");
  if (wxBtn) {
    wxBtn.addEventListener("click", async () => {
      const id = wxBtn.dataset.wechat || "";
      let ok = false;
      try {
        await navigator.clipboard.writeText(id);
        ok = true;
      } catch {
        const ta = document.createElement("textarea");
        ta.value = id;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;top:-100px;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand("copy"); } catch { ok = false; }
        ta.remove();
      }
      const label = wxBtn.querySelector(".rail__tip");
      const done = t("rail.wx.copied") || "WeChat ID copied";
      if (ok) {
        toast(`${done}: ${id}`);
        if (label) label.textContent = done;
        wxBtn.classList.add("is-done");
        setTimeout(() => {
          wxBtn.classList.remove("is-done");
          if (label) label.textContent = t("rail.wx") || "WeChat ID — copy";
        }, 2200);
      } else {
        toast(`WeChat: ${id}`);
      }
    });
  }

  /* ───────── dock dims over the hero photo, clears after ───────── */
  const dock = $("#rail");
  if (dock) {
    const hero = $(".hero");
    if (hero && "IntersectionObserver" in window) {
      const dio = new IntersectionObserver(([e]) => {
        dock.classList.toggle("is-dim", e.isIntersecting && e.intersectionRatio > 0.45);
      }, { threshold: [0, 0.45, 1] });
      dio.observe(hero);
    }
  }

  /* ───────── mobile bar steps out of the way while scrolling down ───────── */
  if (dock) {
    const phone = matchMedia("(max-width: 1080px)");
    let last = scrollY, idle = null;
    const show = () => dock.classList.remove("is-away");
    addEventListener("scroll", () => {
      if (!phone.matches) { dock.classList.remove("is-away"); return; }
      const y = scrollY;
      if (y > last + 6) dock.classList.add("is-away");
      else if (y < last - 6) show();
      last = y;
      clearTimeout(idle);
      idle = setTimeout(show, 700);
    }, { passive: true });
    phone.addEventListener?.("change", show);
  }

  /* ───────── scroll progress hairline ───────── */
  const progress = $("#progress");
  if (progress) {
    let ticking = false;
    const paint = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      progress.style.transform = `scaleX(${pct})`;
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
    addEventListener("resize", paint, { passive: true });
    paint();
  }

  /* ───────── count-up figures ───────── */
  const counters = $$("[data-count]");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (!isFinite(target)) return;
      if (reduceMotion) { el.textContent = target + suffix; return; }
      const start = performance.now(), dur = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach((c) => cio.observe(c));
    } else counters.forEach(run);
  }

  /* ───────── hero parallax (subtle, desktop only) ───────── */
  const heroMedia = $(".hero__media img");
  if (heroMedia && !reduceMotion && matchMedia("(min-width: 1081px)").matches) {
    let raf = null;
    const move = () => {
      const y = Math.min(scrollY, 720);
      heroMedia.style.setProperty("--shift", (y * 0.06).toFixed(1) + "px");
      raf = null;
    };
    addEventListener("scroll", () => { if (raf === null) raf = requestAnimationFrame(move); }, { passive: true });
  }

  /* ───────── toast ───────── */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    if (!el || !msg) return;
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2800);
  }

  /* ───────── i18n ───────── */
  const RTL = ["ar"];
  function applyLang(code) {
    const dicts = D();
    const use = dicts[code] ? code : "en";
    const dict = dicts[use] || {};
    const fallback = dicts.en || {};
    $$("[data-i18n]").forEach((el) => {
      const val = dict[el.dataset.i18n] || fallback[el.dataset.i18n];
      if (val != null) el.textContent = val;
    });
    document.documentElement.lang = use;
    document.documentElement.dir = RTL.includes(use) ? "rtl" : "ltr";
    const sel = $("#langSelect");
    if (sel) sel.value = use;
    try { localStorage.setItem("skyway-lang", use); } catch (e) {}
    document.dispatchEvent(new CustomEvent("skyway:lang", { detail: use }));
  }

  const langSel = $("#langSelect");
  if (langSel) langSel.addEventListener("change", (e) => applyLang(e.target.value));
  let saved = "en";
  try { saved = localStorage.getItem("skyway-lang") || "en"; } catch (e) {}
  applyLang(saved);

  /* ───────── pricing model ───────── */
  const DATA = window.SKYWAY_DATA || { origins: {}, handling: {}, truckBase: {}, kgPerCbm: 167 };
  const N = Object.keys(DATA.origins).length ? DATA.origins : {};

  function chargeable(weight, volume) {
    return Math.max(Math.max(1, weight || 0), (volume || 0) * (DATA.kgPerCbm || 167));
  }

  function rate({ origin, mode, weight, volume, dest }) {
    const o = N[origin] || N.china || { sea: 36000, air: 980, min: 18000 };
    const kg = chargeable(weight, volume);
    const cbm = Math.max(0.1, volume || (weight || 1) / (DATA.kgPerCbm || 167));
    let total = 0, lines = [];
    if (mode === "air") {
      total = kg * o.air + (DATA.handling.air || 6500);
      total = Math.max(total, o.min);
      lines = [["Air freight", money(kg * o.air)], ["Handling & clearance", money(DATA.handling.air || 6500)]];
    } else if (mode === "sea") {
      total = Math.max(cbm * o.sea, o.min) + (DATA.handling.sea || 9500);
      lines = [["Sea freight (LCL)", money(Math.max(cbm * o.sea, o.min))], ["Port handling", money(DATA.handling.sea || 9500)]];
    } else if (mode === "door") {
      total = Math.max(cbm * o.sea * 1.4, o.min * 1.25) + (DATA.handling.door || 12000);
      lines = [["Door-to-door freight", money(Math.max(cbm * o.sea * 1.4, o.min * 1.25))], ["Delivery & handling", money(DATA.handling.door || 12000)]];
    } else {
      const base = (DATA.truckBase && DATA.truckBase[dest || "nairobi"]) || 38000;
      const perKg = Math.max(0, weight || 0) * 9;
      total = base + perKg + (DATA.handling.truck || 4000);
      lines = [["Truck hire", money(base)], ["Loading / per-kg", money(perKg)], ["Handling", money(DATA.handling.truck || 4000)]];
    }
    return { total, kg, cbm, lines };
  }

  const modeName = { air: "mode.air", sea: "mode.sea", door: "mode.door", truck: "calc.truck" };

  /* ───────── hero quote rail ───────── */
  const qr = $("#quoteRail");
  if (qr) {
    const origin = $("#qrOrigin"), mode = $("#qrMode"), value = $("#qrValue"), out = $("#qrOut"), note = $("#qrNote");
    let unit = "kg";
    $$(".seg button", qr).forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.unit === unit) return;
      const v = Math.max(0.1, +value.value || 1);
      unit = b.dataset.unit;
      value.value = unit === "cbm" ? Math.max(0.1, Math.round((v / 167) * 100) / 100) : Math.round(v * 167);
      value.step = unit === "cbm" ? "0.1" : "1";
      $$(".seg button", qr).forEach((x) => x.classList.toggle("is-on", x === b));
      update();
    }));

    function current() {
      const v = Math.max(unit === "cbm" ? 0.1 : 1, Math.min(unit === "cbm" ? 100 : 5000, +value.value || 1));
      const safeMode = mode.value === "door" ? "door" : mode.value;
      return {
        mode: safeMode,
        value: v,
        unit,
        origin: origin.value,
        compute: rate({
          origin: origin.value,
          mode: safeMode,
          weight: unit === "kg" ? v : 0,
          volume: unit === "cbm" ? v : 0
        })
      };
    }

    function update() {
      const c = current();
      out.textContent = money(c.compute.total);
      const label = c.unit === "cbm"
        ? `${c.value} CBM · ${t(modeName[c.mode])} · ${t("qr.estimate")}`
        : `${Math.round(c.value)} kg · ${t(modeName[c.mode])} · ${t("qr.estimate")}`;
      note.dataset.dynamic = "1";
      note.textContent = label + " — " + t("qr.note");
      qr.dataset.payload = JSON.stringify(c);
    }

    [origin, mode, value].forEach((el) => {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });
    document.addEventListener("skyway:lang", update);
    update();

    qr.addEventListener("submit", (e) => {
      e.preventDefault();
      const c = current();
      const text = `Hi Skyway, I'd like a quote.\nOrigin: ${origin.options[origin.selectedIndex].text}\nMode: ${t(modeName[c.mode])}\nShipment: ${c.value} ${c.unit.toUpperCase()}\nIndicative estimate: ${money(c.compute.total)}\n\nPlease advise on next steps.`;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }

  /* ───────── calculators page ───────── */
  const calcForm = $("#calcForm");
  if (calcForm) {
    const tabs = $$(".calc-tab");
    const origin = $("#calcOrigin"), weight = $("#calcWeight"), volume = $("#calcVolume");
    const dest = $("#calcDest"), destField = $("#calcDestField");
    const out = $("#calcOut"), meta = $("#calcMeta"), brk = $("#calcBreak"), wa = $("#calcWa");
    let mode = "air";

    const setMode = (m) => {
      mode = m;
      tabs.forEach((tab) => {
        const on = tab.dataset.calc === m;
        tab.classList.toggle("is-on", on);
        tab.setAttribute("aria-selected", String(on));
      });
      destField.style.display = m === "truck" ? "" : "none";
      volume.closest(".field").style.display = m === "air" ? "" : "";
      render();
    };

    function render() {
      const r = rate({ origin: origin.value, mode, weight: +weight.value, volume: +volume.value, dest: dest.value });
      out.textContent = money(r.total);
      const o = N[origin.value] || {};
      const days = mode === "air" ? o.airDays : o.seaDays;
      const transit = days ? `${days[0]}–${days[1]} ${t("x.days") || "days"}` : "";
      meta.textContent = `${t(modeName[mode])} · ${Math.round(r.kg)} kg / ${r.cbm.toFixed(2)} CBM` + (transit ? ` · ${transit}` : "");
      brk.innerHTML = r.lines.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join("") +
        `<li><span>${t("calc.excludes") || "Duty, VAT & port charges"}</span><b>${t("calc.excluded") || "not included"}</b></li>`;
      const text = `Hi Skyway, I used your calculator.\nMode: ${t(modeName[mode])}\nOrigin: ${origin.options[origin.selectedIndex].text}\nShipment: ${Math.round(r.kg)} kg / ${r.cbm.toFixed(2)} CBM\nIndicative estimate: ${money(r.total)}\n\nPlease confirm a firm quote.`;
      if (wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    }

    tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.calc)));
    [origin, weight, volume, dest].forEach((el) => {
      el.addEventListener("input", render);
      el.addEventListener("change", render);
    });
    calcForm.addEventListener("submit", (e) => { e.preventDefault(); render(); toast(t("toast.calc") || "Estimate updated."); });
    document.addEventListener("skyway:lang", render);

    /* deep links: ?origin=china or #sea */
    const params = new URLSearchParams(location.search);
    if (params.get("origin") && N[params.get("origin")]) origin.value = params.get("origin");
    const hash = (location.hash || "").replace("#", "");
    setMode(["air", "sea", "truck", "door"].includes(hash) ? hash : "air");
    if (hash === "truck") destField.style.display = "";
  }

  /* ───────── tracking status request ───────── */
  const trackForm = $("#trackForm");
  if (trackForm) {
    const refIn = $("#trackRef"), contactIn = $("#trackContact"), msg = $("#trackMsg"), wa = $("#trackWa");
    const compose = () => {
      const ref = refIn.value.trim().toUpperCase();
      const contact = contactIn.value.trim();
      const text = `Hi Skyway, please send a status update.\nReference: ${ref || "-"}\nReply to: ${contact || "-"}`;
      if (wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
      return { ref, contact, text };
    };
    trackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { ref, contact, text } = compose();
      if (!ref || !contact) {
        msg.textContent = t("track.needboth") || "Add your reference and a phone number or email so we can reply.";
        msg.style.color = "#b4483a";
        (ref ? contactIn : refIn).focus();
        return;
      }
      msg.textContent = t("track.sent") || "Request ready — opening WhatsApp. You can also call the office.";
      msg.style.color = "#2f7d4f";
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      if (wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    });
    [refIn, contactIn].forEach((el) => el.addEventListener("input", compose));
    compose();
  }

  /* ───────── contact form → WhatsApp (works everywhere) ───────── */
  const contactForm = $("#contactForm");
  if (contactForm) {
    const msg = $("#formMsg");
    const compose = () => {
      const name = ($("#cName")?.value || "").trim();
      const phone = ($("#cPhone")?.value || "").trim();
      const mail = ($("#cEmail")?.value || "").trim();
      const originSel = $("#cOrigin"), serviceSel = $("#cService");
      const origin = originSel ? originSel.options[originSel.selectedIndex].text : "-";
      const service = serviceSel ? serviceSel.options[serviceSel.selectedIndex].text : "-";
      const body = ($("#cMsg")?.value || "").trim();
      const text =
        `Hi Skyway, I'd like a quote.\n` +
        `Name: ${name || "-"}\nPhone: ${phone || "-"}\nEmail: ${mail || "-"}\n` +
        `Shipping from: ${origin}\nService: ${service}\n\n${body || "-"}`;
      const mailLink = $("#formMail");
      if (mailLink) {
        mailLink.href =
          `mailto:skyway@skyway.co.ke?subject=${encodeURIComponent("Website enquiry — " + (name || "new customer"))}` +
          `&body=${encodeURIComponent(text)}`;
      }
      return { name, phone, body, text };
    };
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { name, phone, body, text } = compose();
      if (!name || !phone || !body) {
        msg.textContent = t("form.err") || "Please fill in your name, phone and message.";
        msg.style.color = "#b4483a";
        toast(msg.textContent);
        return;
      }
      msg.textContent = t("form.ok") || "Opening WhatsApp with your enquiry — send it and we'll reply today.";
      msg.style.color = "#2f7d4f";
      toast(msg.textContent);
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
    contactForm.addEventListener("input", compose);
    compose();
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
