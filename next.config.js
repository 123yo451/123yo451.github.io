module.exports = {
  output: "export",
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
  images: {
    // GitHub Pages serves a static export without an image optimization server.
    unoptimized: true,
  },
};
