// Your name appears in the top navigation and page titles.
export const name = "Your Name";
export const websiteDescription = `${name}'s personal website.`;

// Add, remove, or reorder links here. href accepts local paths or external URLs.
export const navigationLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

// Fonts: use a Google Fonts family name (e.g. "Open Sans"), or one of:
//   { family: "Open Sans", weights: [400, 500, 600, 700] }
//   { family: "Custom Serif", stylesheet: "https://example.com/fonts.css" }
//   { family: "Custom Mono", src: "https://example.com/mono.woff2", weight: "100 900" }
// For stylesheet links, family must match the CSS font-family in that stylesheet.
// Direct files accept optional weight (default "400") and style (default "normal").
// Use null for a system font stack. A Google name alone loads its regular style;
// use weights or a Google stylesheet URL for additional weights/italic styles.
// External fonts load in the visitor's browser. No layout or CSS edits are needed.
/** @type {import('./lib/fonts').FontConfig} */
export const fonts = {
  sans: { family: "Geist", weights: [400, 500, 600, 700] },
  serif: { family: "Source Serif 4", weights: [400, 500, 600, 700] },
  monospace: { family: "Geist Mono", weights: [400, 500, 600, 700] },
};

// computed values

export const metadata = {
  title: {
    default: `Home ⋅ ${name}`,
    template: `%s ⋅ ${name}`,
  },
  description: websiteDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
