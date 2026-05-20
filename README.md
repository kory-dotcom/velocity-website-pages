# Velocity website pages

Static HTML modules and the **Velocity Staging Site** router (`VelocityStagingSite/`) used for review and testing.

## GitHub Pages

1. Push this repository to GitHub (see below).
2. In the repo on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** and folder **/ (root)**.
5. Save. After a minute, the site will be at:
  **[https://kory-dotcom.github.io/velocity-website-pages/](https://kory-dotcom.github.io/velocity-website-pages/)**
6. Open the staging app at:
  **[https://kory-dotcom.github.io/velocity-website-pages/VelocityStagingSite/](https://kory-dotcom.github.io/velocity-website-pages/VelocityStagingSite/)**
   Or open the repo root; `index.html` redirects into `VelocityStagingSite/`.
   Custom domain (if configured): **[https://staging.velocitytx.com/VelocityStagingSite/](https://staging.velocitytx.com/VelocityStagingSite/)**

Repository: **[https://github.com/kory-dotcom/velocity-website-pages](https://github.com/kory-dotcom/velocity-website-pages)**

## Local preview (normal / Elementor staging — port **8000**)

This repo’s **staging router** (`VelocityStagingSite/`) loads the same HTML you paste into WordPress. It **does not** use the **`Custom Site/` CMS** (`npm run dev` on port 3000). Use one of:

```bash
cd "/path/to/Velocity Website Pages"
python3 -m http.server 8000
```

Open **[http://localhost:8000/](http://localhost:8000/)** (root redirects into `VelocityStagingSite/`).

Or, from the repo root:

```bash
npm run preview
```

That serves the repo on **8000** with `serve`. Edit files under **`Bundles Page/`**, **`Home/`**, etc., and reload the browser.

Note: **`Custom Site/`** is a separate Express app for JSON-driven content and **`npm run build`**; use it only when you need that workflow.

**Notes**

- `.nojekyll` is included so GitHub does not run Jekyll on these files.
- **Free** GitHub Pages applies to **public** repositories. Private repo Pages may require a paid plan; check current GitHub pricing.
- Paths are relative; they work on both `localhost` and `https://user.github.io/repo/…`.

## WordPress / Elementor — source files (clickable on GitHub)

Use these **blob** links when you need a stable URL (spaces and `&` are encoded). Replace `main` with your branch if needed.


| #   | Page                        | Source on GitHub                                                                                                                                                                                                                     |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Home                        | [Home/velocity-home-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Home/velocity-home-elementor.html)                                                                                               |
| 2   | Food & Drink / Menu         | [Food & Drink/velocity-food-drink-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Food%20%26%20Drink/velocity-food-drink-elementor.html)                                                             |
| 3   | Group events                | [Parties & Events/velocity-parties-events-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Parties%20%26%20Events/velocity-parties-events-elementor.html)                                             |
| 4   | Book Now                    | [Book Now/velocity-book-now-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Book%20Now/velocity-book-now-elementor.html)                                                                             |
| 5   | Membership                  | [Membership Page/velocity-membership-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Membership%20Page/velocity-membership-elementor.html)                                                           |
| 6   | Party Packs                 | [Party Packs/velocity-party-packs-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Party%20Packs/velocity-party-packs-elementor.html)                                                                 |
| 7   | Promotions                  | [Promotions/velocity-promotions-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Promotions/velocity-promotions-elementor.html)                                                                       |
| 8   | Father's Day bundles        | [Bundles Page/velocity-fathers-day-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/Bundles%20Page/velocity-fathers-day-elementor.html)                                                              |
| 9   | About / How it works        | [About : How it Works Page_files/velocity-about-how-it-works-elementor.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/About%20%3A%20How%20it%20Works%20Page_files/velocity-about-how-it-works-elementor.html) |
| 10  | Site-wide navbar            | [velocity-navbar.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/velocity-navbar.html)                                                                                                                         |
| 11  | *(optional)* Preview navbar | [preview-navbar.html](https://github.com/kory-dotcom/velocity-website-pages/blob/main/preview-navbar.html)                                                                                                                           |


In **Cursor / VS Code**, open files with spaces from the terminal using quotes, e.g. `open "Food & Drink/velocity-food-drink-elementor.html"`.

## First-time push

```bash
cd "/path/to/Velocity Website Pages"
git init
git add -A
git commit -m "Initial commit: static site + Local Replica"
git branch -M main
```

Create a new empty repository on GitHub (no README), then:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

Or with [GitHub CLI](https://cli.github.com/) after `gh auth login`:

```bash
gh repo create YOUR_REPO --public --source=. --remote=origin --push
```

