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

## Development notes

- Use Node.js 20.9 or later (Node.js 24 is used in CI and the dev container). The app targets Next.js 16.3.5 with React 19.
- After updating dependencies, run `npm install` to refresh `package-lock.json`
and the installed packages, then run `npm run typecheck`. Commit the updated
lockfile with `package.json`; CI uses `npm ci`.
- The site uses `output: "export"` for GitHub Pages and deploys the generated `out/` directory.
