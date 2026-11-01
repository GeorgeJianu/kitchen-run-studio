# Kitchen Run Studio

Live: **https://georgejianu.github.io/kitchen-run-studio/**

A single-file furniture planner: lay cabinets along a wall or round a room, see them in 2D and 3D, get a cut list with sheet nesting, hardware and a priced estimate, and ask contractors for quotes. It installs as an app on a phone, a tablet or a computer and works offline.

| File | What it is |
| --- | --- |
| `index.html` | **Studio 5 (v5.3.0)** — the app the site serves. Romanian by default with an EN switch, RON + EUR, budget/premium tiers, platform-set prices with where-to-buy links, no-overlap placement, start-screen furniture templates with width/height/depth, 1/2/4-door cupboards, paid-plans / contractor-quotes flow (prototype, simulated payments), phone layout with bottom tabs. |
| `kitchen-run-studio.html` | **Studio 4 (v4.12.0)** — the English planner: Kastamonu Entegre decor catalogue by code, three buying modes (cut myself / pre-cut / cutting service), Excel export of the parts with grain direction. |
| `manifest.json`, `sw.js`, `icon-*.png`, `icon.svg`, `apple-touch-icon.png` | What makes it installable and offline-capable. |

## Features

- Wall runs and whole-room layouts with windows and doors; a kitchen wizard that proposes a layout.
- Front, top and interactive 3D views (drag to turn, scroll or pinch to zoom, doors open/shut, dimensions).
- Cabinet types: doors, drawers, combos, sinks, corners, oven housings, appliance spaces, open shelves, wine racks.
- Cut list with edge banding per part, System 32 notes, guillotine sheet nesting with kerf and trim, stock/offcuts first.
- Costing: board by sheet or by m², hardware price list, worktop, shop time; totals follow the chosen buying mode.
- Kastamonu Entegre decorative-panel range (D/A/B codes) as finishes, searchable by code.
- Excel (SheetJS) and CSV export, printable plans, project files.

## Marketplace prototype (Studio 5)

Roles are switchable in the app for demo purposes: a customer plans for free and sees the estimate; full plans are paid for or unlocked when a contractor's offer is accepted; the contractor sees the plans to quote, gets the customer's details only after acceptance, and pays the platform a commission. The platform role sets every price and the shop links a buyer of the plans gets. Payments and accounts are simulated in the browser — a real deployment needs a backend, authentication and a payment provider.

## Install it

- **Android** — open the address in Chrome, menu ⋮ → **Add to Home screen** (or **Install app**).
- **iPhone / iPad** — open the address in Safari, tap **Share** → **Add to Home Screen**.
- **Windows / Mac** — open the address in Chrome or Edge, click the **install** icon at the right end of the address bar.

## Update it

Replace `index.html` and commit. Installed copies notice the change the next time they start and show **A new version is ready — Reload**. If the icons or `manifest.json` change, also bump `VERSION` at the top of `sw.js`.

## Good to know

- **Projects stay on the device.** Each browser keeps its own projects. To move or back one up, use **Save project file** / **Open project file** (`.kitchen.json`); a file dropped on the page opens too.
- **Clearing site data or uninstalling the app deletes the projects stored there.**
- **Privacy.** Everything runs in the browser; no project data is sent anywhere. The website only serves these files.
