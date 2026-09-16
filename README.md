# Personal website template

- This website is based off of the [portfolio-blog-starter](https://portfolio-blog-starter.vercel.app) Vercel template: https://github.com/vercel/examples/tree/main/solutions/blog

## Configuring your website

- Edit `app/config.js` with your information.
- Edit `app/projects/data.ts` with past projects you'd like to showcase.
    - Put photos in `public/projects/` (create the folder if needed) and use filenames relative to `public/`, such as `"example-project/my-project.jpg"`.

## GitHub Actions setup

- After creating or forking your project, run:

```bash
bash setup-github.sh
```

- This creates `.github/workflows/deploy.yml` from the template embedded in the script, so the workflow can be added in a new commit in your own repository.
- The workflow builds the site with Node.js 24 and deploys `out/` to GitHub Pages.
    - Ensure [GitHub Actions is enabled](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository) in the new repository. Under **Settings > Pages > Build and deployment**, select **GitHub Actions** as the [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Development notes

- Use Node.js 20.9 or later (Node.js 24 is used in CI and the dev container). The app targets Next.js 16.3.5 with React 19.
- The site uses `output: "export"` for GitHub Pages and deploys the generated `out/` directory.
