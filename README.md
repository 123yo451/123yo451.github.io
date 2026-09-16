# Personal website template

- This website is based off of the [portfolio-blog-starter](https://portfolio-blog-starter.vercel.app) Vercel template: https://github.com/vercel/examples/tree/main/solutions/blog

## Navigation

Edit `app/config.js` to set `name` (the top-left name and page titles)
and `navigationLinks` (the ordered list of `{ href, label }` links). Links can
point to local pages or external URLs. Below 640px, a hamburger button opens
a scrollable list below the name. Selecting a link or pressing Escape closes
the menu. Larger screens show the links inline.

## Home page profile

Edit `ownerProfile` in `app/config.js` to set the owner's photo and labeled facts.
Put the photo inside `public/`, then set `photo.filename`
to its path relative to that folder, such as `"profile.jpg"` or
`"images/profile.webp"`. Leave it empty for a blank photo placeholder.

Add, remove, or reorder `facts` as needed. Every fact needs a `label` and
`value`; add `href` when the value should be a link, such as a `mailto:` URL.
The photo and facts form a left sidebar beside the introduction from
`app/components/intro.mdx`. Edit that file for the main home page content.
On mobile screens, the sidebar appears above the introduction.

Set `ownerProfile.links` to an ordered list of `{ label, href }` entries for
LinkedIn, Google Scholar, or any other links below the profile facts. Replace
the example URLs with your own. Links accept external URLs or local paths;
set the list to `[]` to hide the section. Each link appears on its own line with
a top-right arrow. Set `ownerProfile.linksTitle` to customize the heading
(default: `"Links"`).

## Projects

Edit the `projectsPage` object in `app/projects/data.ts` to customize `/projects`.
Set the page title and description, then replace the example projects with your
own. Projects display in array order; move entries to reorder them.

Each project needs a unique URL-friendly `id`, `title`, and `description`.
The ID also creates a direct link such as `/projects#example-project`.
Descriptions are plain text and preserve line breaks. Optional fields include:

- `date`: any readable date or range, such as `"June 2025"`, `"2023 – 2025"`, or `"2025 – Present"`.
- `details`: labeled values for your role, collaborators, client, status, or results.
- `tags`: tools, technologies, or topics.
- `links`: `{ label, href }` entries for demos, source code, papers, or related pages. Local paths and external URLs are supported.
- `photos`: an ordered gallery of images, each with `filename`, descriptive `alt` text, original pixel `width` and `height`, and an optional `caption` or credit.

Put photos in `public/projects/` (create the folder if needed) and use filenames
relative to `public/`, such as `"projects/my-project.jpg"`. Uncomment and edit the
photo example in the data file after adding your image. Images keep their original
aspect ratios and support the GitHub Pages base path automatically.

Omit optional fields or use empty arrays to hide their sections. Set `projects`
to `[]` for an empty-state message. Content changes take effect on the next deployment.

## Fonts

Set `fonts.sans`, `fonts.serif`, and `fonts.monospace` in `app/config.js`.
Each accepts a Google Fonts name, such as `"Open Sans"`, or an object:

```js
{ family: "Open Sans", weights: [400, 500, 600, 700] }
{ family: "Custom Serif", stylesheet: "https://example.com/fonts.css" }
{ family: "Custom Mono", src: "https://example.com/mono.woff2", weight: "100 900" }
```

For a stylesheet, use the exact `font-family` declared by the provider. Google
Fonts stylesheet links also work, including links specifying italics or variable
axes. See the [Google Fonts CSS API](https://developers.google.com/fonts/docs/css2)
for available URL options. A name alone requests the regular style; request only
weights supported by that family. Direct font files default to weight `400` and
style `normal`; set `weight` to the file's weight or variable range and `style` to
`normal`, `italic`, or `oblique`. Use a stylesheet for multiple files/styles.
URLs load in visitors' browsers and must allow use from your site's origin.

Use `null` for a system font stack without a download. Sans is the default body
font; code uses monospace. The Tailwind `font-sans`, `font-serif`, and `font-mono`
utilities use the same configuration, including in MDX. Font changes only need
edits to `app/config.js` and take effect on the next deployment.

## GitHub Actions setup

After creating or forking your project, run:

```bash
bash setup-github.sh
```

This creates `.github/workflows/deploy.yml` from the template embedded in the
script, so the workflow can be added in a new commit in your own repository.
The script always creates `.github` in the directory containing the script,
regardless of your current working directory. It does not accept a project-directory
argument and refuses to overwrite an existing deployment workflow. Other files
in `.github` are preserved.

The workflow builds the site with Node.js 24 and deploys `out/` to GitHub Pages.
If your default branch is not `main`, update `on.push.branches` in the generated
workflow before committing it.

Ensure [GitHub Actions is enabled](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
in the new repository. Under **Settings > Pages > Build and deployment**, select
**GitHub Actions** as the [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
The script creates local files; repository settings must be configured on GitHub.
Then commit and push the generated workflow to your default branch:

```bash
git add .github/workflows/deploy.yml
git commit -m "Set up GitHub Pages deployment"
git push
```

## Development notes

- Use Node.js 20.9 or later (Node.js 24 is used in CI and the dev container). The app targets Next.js 16.3.5 with React 19.
- After updating dependencies, run `npm install` to refresh `package-lock.json`
and the installed packages, then run `npm run typecheck`. Commit the updated
lockfile with `package.json`; CI uses `npm ci`.
- The site uses `output: "export"` for GitHub Pages and deploys the generated `out/` directory.
