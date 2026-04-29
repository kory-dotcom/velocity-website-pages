# Velocity website pages

Static HTML modules and the **Local Replica** router used for review and testing.

## GitHub Pages

1. Push this repository to GitHub (see below).
2. In the repo on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** and folder **/ (root)**.
5. Save. After a minute, the site will be at:

   **https://kory-dotcom.github.io/velocity-website-pages/**

6. Open the replica at:

   **https://kory-dotcom.github.io/velocity-website-pages/Local%20Replica/index.html**

   Or open the repo root; `index.html` redirects into Local Replica.

Repository: **https://github.com/kory-dotcom/velocity-website-pages**

**Notes**

- `.nojekyll` is included so GitHub does not run Jekyll on these files.
- **Free** GitHub Pages applies to **public** repositories. Private repo Pages may require a paid plan; check current GitHub pricing.
- Paths are relative; they work on both `localhost` and `https://user.github.io/repo/…`.

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
