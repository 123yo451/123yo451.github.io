# Personal website template

- This website is based off of the [portfolio-blog-starter](https://portfolio-blog-starter.vercel.app) Vercel template: https://github.com/vercel/examples/tree/main/solutions/blog

## Navigation

Edit `app/config.js` to set `name` (the top-left name and page titles)
and `navigationLinks` (the ordered list of `{ href, label }` links). Links can
point to local pages or external URLs. Below 640px, a hamburger button opens
a scrollable list below the name. Selecting a link or pressing Escape closes
the menu. Larger screens show the links inline.

## Development notes

- Use Node.js 20.9 or later (Node.js 24 is used in CI and the dev container). The app targets Next.js 16.3.5 with React 19.
- After updating dependencies, run `npm install` to refresh `package-lock.json`
and the installed packages, then run `npm run typecheck`. Commit the updated
lockfile with `package.json`; CI uses `npm ci`.
- The site uses `output: "export"` for GitHub Pages and deploys the generated `out/` directory.
