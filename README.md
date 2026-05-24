# Personal homepage (GitHub Pages)

A small React site: edit JSON, drop in a PDF résumé, deploy to GitHub Pages. No CMS.

![Screenshot](https://github.com/user-attachments/assets/c40050f6-780b-4af0-8598-93deb0f7f373)

## Reusing this repo (recommended)

You do **not** install this as an `npm` dependency inside another app. It is a full Create React App project. Reuse it by **copying the project** and changing config.

### Option A: GitHub “Use this template”

1. On GitHub, enable **Template repository** (Settings), or fork this repo.
2. Create your new repo from the template (or clone your fork).
3. Set your Pages URL in `package.json` (see below).
4. Edit `src/resources/userConfig.json` and replace `src/resources/file.pdf` with your résumé (keep the filename `file.pdf` or update the import in `src/App.js`).
5. Optionally update `public/index.html` (`<title>`, meta description).
6. Run `npm install`, then `npm start` to preview, then `npm run deploy`.

### Option B: One-line copy with [degit](https://github.com/Rich-Harris/degit)

```bash
npx degit github:YOUR_USER/homepage my-site
cd my-site
npm install
```

Replace `YOUR_USER/homepage` with this template’s path. Then follow steps 3–6 above.

### Set `homepage` without hand-editing JSON

From the project root (after `npm install`):

```bash
npm run set-site -- <github-username> <repository-name>
```

Example:

```bash
npm run set-site -- janesmith my-portfolio
```

That writes `https://janesmith.github.io/my-portfolio` into `package.json` so asset paths work on GitHub Pages.

---

## Requirements

- Node.js and npm
- A GitHub account (for Pages)

## Deploy to GitHub Pages

1. `npm run deploy` (runs `predeploy` build, then `gh-pages` pushes the `build/` folder to the `gh-pages` branch).
2. In the GitHub repo: **Settings → Pages**:
   - **Source:** Deploy from a branch (not “GitHub Actions” unless you added a workflow)
   - **Branch:** `gh-pages` (not `main`)
   - **Folder:** `/ (root)`
3. Open `https://<username>.github.io/<repo>/` (same URL as `homepage` in `package.json`).

### Site shows the README instead of the React app?

GitHub is publishing **`main`**, where Jekyll turns `README.md` into the homepage. Switch Pages to the **`gh-pages`** branch (step 2 above), wait 1–2 minutes, then hard-refresh. The repo includes `public/.nojekyll` so Jekyll does not process the built site.

---

## Legacy: scripted setup

If you still use the external shell installer:

```bash
curl -O https://raw.githubusercontent.com/karansharmaufl/scripts/refs/heads/main/setup/homepage_setup.sh && bash homepage_setup.sh
```

Prefer the template + `set-site` flow above unless you rely on that script.

---

## If you truly want `import … from 'some-package'`

That means publishing a **React component library** (your UI as a package with `react` as a peer dependency, plus shipped CSS or Tailwind preset). This repo is not structured that way today; it would be a separate refactor or a new package that wraps the same layout.

For most people, **template + config + deploy** is the right reuse model.
