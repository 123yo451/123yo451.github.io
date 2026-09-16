// Your name appears in the top navigation and page titles.
export const name = "Your Name";
export const websiteDescription = `${name}'s personal website.`;

// Add, remove, or reorder links here. href accepts local paths or external URLs.
export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

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
