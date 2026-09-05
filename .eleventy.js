// Institutional Public Policy Press — site configuration
//
// Content lives in /content and is edited through Pages CMS (see .pages.yml).
// Templates live in /src. The built site lands in /_site, which Cloudflare
// Pages serves. Nothing in /content needs to be touched by hand.

const rss = require("@11ty/eleventy-plugin-rss");

const LANGS = ["en", "fr", "it"];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rss);

  // static assets copied through untouched
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/content/media": "media" });

  // ---- collections --------------------------------------------------------

  eleventyConfig.addCollection("titles", (api) =>
    api.getFilteredByGlob("src/content/catalogue/*.md")
       .sort((a, b) => (b.data.year || 0) - (a.data.year || 0))
  );

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/content/blog/*.md")
       .filter((p) => !p.data.draft)
       .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("episodes", (api) =>
    api.getFilteredByGlob("src/content/podcast/*.md")
       .filter((p) => !p.data.draft)
       .sort((a, b) => b.date - a.date)
  );


  // pages × languages and titles × languages, so one template renders all three
  eleventyConfig.addCollection("pageLangs", (api) => {
    const pages = api.getFilteredByGlob("src/content/pages/*.md");
    return LANGS.flatMap((lang) => pages.map((page) => ({ lang, page })));
  });
  eleventyConfig.addCollection("titleLangs", (api) => {
    const titles = api.getFilteredByGlob("src/content/catalogue/*.md");
    return LANGS.flatMap((lang) => titles.map((title) => ({ lang, title })));
  });

  // ---- filters ------------------------------------------------------------

  // pick the field for the current language, falling back to English
  eleventyConfig.addFilter("t", (obj, lang) => {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  });

  // markdown-to-html for CMS text fields
  const md = require("markdown-it")({ html: true, typographer: true });
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));

  // path prefix for a language: "" for en, "fr/" for fr
  eleventyConfig.addFilter("langRoot", (lang) => (lang === "en" ? "" : lang + "/"));


  eleventyConfig.addFilter("dateLong", (d, lang) => {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleDateString(
      { en: "en-GB", fr: "fr-FR", it: "it-IT" }[lang] || "en-GB",
      { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("dateISO", (d) =>
    (d instanceof Date ? d : new Date(d)).toISOString());

  eleventyConfig.addGlobalData("langs", LANGS);

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
