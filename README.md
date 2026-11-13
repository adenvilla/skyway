# Skyway

Premium multi-page website for **Skyway Forwarders Ltd** — a Kenyan freight forwarder and
customs clearing agent ([skyway.co.ke](https://skyway.co.ke)). Built as a fast, dependency-free
static site: eight pages, five languages, no framework and no backend.

---

## Quick start

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 3000
```

Then visit <http://localhost:3000>. There is no npm install and no build step required to view the
site — the HTML in the root is the finished output.

---

## Pages

| Page | What's on it |
| --- | --- |
| `index.html` | Hero with an animated Guangzhou → Dubai → Nairobi route arc, instant-quote panel, capabilities, trade-lane teaser, finance, testimonial, figures, press, contact CTA |
| `services.html` | Air freight, sea cargo, clearing & documentation, trucking, warehousing, door to door |
| `lanes.html` | China, U.K., Dubai, Turkey and U.S.A. → Kenya — transit times and what each lane suits |
| `calculators.html` | Air (chargeable weight) and sea (CBM) cost estimators |
| `tracking.html` | How to request a status update on a consignment |
| `network.html` | All seven real offices: Nairobi, Mombasa, Guangzhou, Yiwu, Dubai, Istanbul, Eldoret |
| `about.html` | Company story, values, leadership, press |
| `contact.html` | Full address, phones, emails, Google Maps card, quote form that hands off to WhatsApp |

---

## How the site is built

The HTML files in the root are **generated**. Edit the source, then rebuild:

```
src/shell.html      Shared chrome: <head>, utility bar, header/nav, footer, contact dock, toast
src/pages/*.html    One body fragment per page
css/                base · components · pages · layout · responsive · fx
js/                 app.js, i18n.js, data.js, ui.js, lang/*
build.py            Writes the eight *.html files at the project root
```

```bash
python3 build.py
```

`build.py` injects each page body into the shell and fills in the per-page `<title>` and
`<meta name="description">` from the `META` table at the top of the file.

### File map

| File | Responsibility |
| --- | --- |
| `css/base.css` | Design tokens, typography, buttons, header, footer basics, reveal |
| `css/components.css` | Hero, route arc, quote rail, capability rows, lane rows, numbers, contact dock |
| `css/pages.css` | Page heads, chips, panels shared by inner pages |
| `css/layout.css` | Network cards, calculators, press rows, contact page, map card |
| `css/responsive.css` | Breakpoints (1080 / 900 / 720 / 420), RTL, reduced motion, print |
| `css/fx.css` | Seamless hero header, hero atmosphere and entrance, marquee, section motion |
| `js/app.js` | Every interaction: nav, language switch, calculators, quote hand-off, form, dock |
| `js/i18n.js` | English + Chinese strings and the translation registry |
| `js/lang/*.js` | Turkish, Arabic, Somali and the later feature sets (t1–t7) |
| `js/data.js` | Lane and rate data used by the calculators |
| `js/ui.js` | Small shared UI helpers |

Script order matters: `t1`–`t7` must load before `ui.js` and `app.js`.

---

## Features

**Five languages** — English, 中文, Türkçe, العربية, Soomaali. The switcher re-renders the page
through `data-i18n` keys, stores the choice in `localStorage`, and flips the document to
right-to-left for Arabic.

**Seamless header** — on the home page and every inner page the dark region runs underneath the
navigation. The bar starts transparent over the photography, swaps to the light logo, then
solidifies into paper white with the ink logo as soon as you scroll.

**Hero motion** — the photo drifts slowly, two brass and teal light washes breathe behind the type,
the route arc draws itself and then carries a travelling light along the curve, the headline rises
line by line, and the brass italic line catches a light sweep. All of it stops under
`prefers-reduced-motion`.

**Floating contact dock** — seven branded circular buttons pinned to the left edge, vertically
centred, with hover tooltips. On tablet and phone it becomes a bottom bar that steps out of the way
while you scroll down.

| Button | Destination |
| --- | --- |
| WhatsApp | `wa.me/254720000213` with a pre-filled message |
| Messenger | `m.me/skywayforwardersltd` |
| Phone | `tel:+254720000213` |
| Instagram | `ig.me/m/skywayforwardersltd` |
| WeChat | copies the ID `wxid_p0r6ys19bzry22` to the clipboard |
| Maps | Skyway's Google Maps listing |
| TikTok | `tiktok.com/@skywayforwardersltd` |

Every destination is one Skyway actually publishes. WeChat exists on the real site only as an ID, so
that button copies it rather than linking to an invented URL.

**Accessibility** — skip link, visible focus rings, `aria-current` navigation, keyboard-operable
menu, labelled icon buttons, reduced-motion support, and no horizontal scroll down to 360 px.

---

## Content accuracy

Contact details and office addresses are taken from skyway.co.ke:

- **Nairobi head office** — 2nd Floor, Optimum House, Skyway Centre, General Waruingi Street,
  Eastleigh, opposite Pumwani Maternity Hospital main gate
- **Phones** — 0720 000 213 / 0791 888 803
- **Email** — skyway@skyway.co.ke, skywaycargo22@gmail.com
- **Hours** — Monday to Saturday, 8:00 – 17:30

Deliberately **not** included, because they do not work or were never real: the
`loyalty.skyway.co.ke` subdomain (its DNS no longer resolves), a customer-facing shipment tracker,
and three phone numbers that appeared in earlier drafts but are not published by Skyway.

---

## Rates disclaimer

Figures in `js/data.js` and every transit time on the site are **indicative planning numbers**, not
an official rate card, and transit times are typical rather than guaranteed. Replace them with
Skyway's real tariffs before quoting customers.

---

## Deployment

Any static host works — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or plain nginx. Publish the
repository root; `index.html` is the entry point.

For **GitHub Pages**: Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
Every path in the site is relative, so it serves correctly from a project subpath such as
`https://<user>.github.io/skyway/`.

---

© Skyway Forwarders Ltd. Photography and the Skyway logo belong to Skyway Forwarders Ltd.
