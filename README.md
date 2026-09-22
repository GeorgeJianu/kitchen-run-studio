# Kitchen Run Studio — installable app

The same Kitchen Run Studio, packaged so it installs on a phone, a tablet or a
computer and works without internet.

What is in this folder

| File | What it does |
|---|---|
| `index.html` | The app itself (the same file as the claude.ai version) |
| `manifest.json` | Name, icon and colours used when the app is installed |
| `sw.js` | Keeps a copy of the app so it opens instantly and works offline |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `icon.svg` | The app icons |

Keep the files together in one folder, exactly as they are here.

## 1. Put it online — GitHub Pages, free, about 5 minutes

1. Create a free account at github.com if you do not have one.
2. Click **New repository**, name it `kitchen-run-studio`, keep it **Public**, click **Create repository**.
3. Click the **uploading an existing file** link, drag all the files of this folder onto the page, click **Commit changes**.
4. Open **Settings → Pages**. Under *Branch* choose `main` and `/ (root)`, click **Save**.
5. After a minute the same page shows your address:
   `https://YOUR-NAME.github.io/kitchen-run-studio/`

Cloudflare Pages and Netlify work the same way (drag the folder onto their deploy page) and are also free. Any host with **https** works.

## 2. Install it

- **Android** — open the address in Chrome, menu ⋮ → **Add to Home screen** (or **Install app**).
- **iPhone / iPad** — open the address in Safari, tap **Share** → **Add to Home Screen**.
- **Windows / Mac** — open the address in Chrome or Edge, click the **install** icon at the right end of the address bar (or menu → **Install Kitchen Run Studio**).

The app then opens from its own icon, full screen, with or without internet. The settings drawer (⚙) has an **Install as an app** button on Android, Windows and Mac too.

## 3. Update it later

Upload the new `index.html` to the repository in place of the old one and commit. Installed copies notice the change the next time they start and show **A new version is ready — Reload**.

If you change the icons or `manifest.json`, also change `VERSION` at the top of `sw.js`, so the installed copies refresh those files as well.

## Good to know

- **Projects stay on the device.** Each phone, tablet or computer keeps its own projects in its browser. To move a project between devices, share it, or keep a copy, use **Save project file** (Ctrl+S, the ↓ button) and **Open project file** (Ctrl+O, the folder button). Files are named `project-name.kitchen.json`; a file dropped anywhere on the page opens too.
- **Uninstalling the app, or clearing the browser's site data, deletes the projects stored there.** Keep a project file of anything you care about.
- **Fonts.** Outfit and JetBrains Mono are fetched from Google Fonts on the first visit and kept for offline use. For a public site in Switzerland or the EU you may prefer to host the two font files yourself (privacy) — download them, put them in a `fonts/` folder, and the stylesheet can be pointed at them.
- **Printing.** From the installed app on Android, Windows and Mac, **Print** works as in the browser (choose *Save as PDF* for a file). On iPhone and iPad, if the print dialog does not open from the installed app, open the address in Safari and print from the Share menu.
- **Privacy.** Everything runs in the browser; no project data is sent anywhere. The website only serves these files.
