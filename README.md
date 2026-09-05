# Institutional Public Policy Press — website

This repository holds the press's website. It is built with Eleventy, edited
through Pages CMS, and published by Cloudflare Pages. You never need to edit a
file by hand: content is written in the editing screen, and every save publishes
the site within about a minute.

## How the pieces fit

- `src/content/` is the content. Catalogue titles, blog posts, podcast episodes
  and the four site pages each live here as one file. This is what Pages CMS
  edits.
- `src/` holds the templates that turn content into pages, and the stylesheet.
- `.pages.yml` tells Pages CMS what content exists and what fields it has.
- `_site/` is the built site. It is generated on every deploy and is not kept in
  the repository.

The catalogue and the four site pages exist in English, French and Italian.
The blog and the podcast are in English only.

## One-time setup

**1. Put this repository on GitHub.** Under the `institutionalpublicpolicy`
account, create a new repository called `website`. Upload the contents of this
folder to it. On the GitHub website you can drag a folder of files into an
empty repository. Do not upload `node_modules` or `_site`; neither is needed.

**2. Connect Cloudflare Pages.** In Cloudflare, go to Compute, then Workers
and Pages, then Create, then Pages, and choose to connect to Git. Authorise
GitHub, pick the `website` repository, and set:

- Build command: `npm run build`
- Build output directory: `_site`

Deploy. Cloudflare builds the site and gives it an address. Then, under the
project's Custom domains, attach `institutionalpublicpolicy.org` and `www`.
This replaces the earlier drag-and-drop project, which can be deleted once the
new one is live.

**3. Connect Pages CMS.** Go to pagescms.org, sign in with the GitHub account,
and open the `website` repository. It reads `.pages.yml` and shows an editing
screen with Catalogue, Blog, Podcast, Site pages and Press details.

From then on every change saved in Pages CMS lands in the repository, and
Cloudflare rebuilds and publishes the site automatically.

## Everyday use

**Add a title to the catalogue.** Catalogue, then New. Fill in the slug, the
status, and the title and subtitle in each language. The description, preface
and review record are optional and can be added later. Leave the author field
empty to withhold the name. Leave ISBNs empty until publication.

**Write a blog post.** Blog, then New. Posts are drafts until you switch the
draft toggle off, so you can write over several sessions.

**Add a podcast episode.** Podcast, then New. The audio file has to be hosted
somewhere public and its address pasted into the audio field. The duration
and file size make the feed correct for podcast apps. The feed is at
`/podcast/feed.xml`, which is the address to give Apple Podcasts and Spotify.

**Change the site text.** Site pages holds About, Peer review and Contact in
all three languages.

**Change the email or address.** Press details.

## Checking the build locally

Only needed if you want to preview before publishing. Requires Node.

    npm install
    npm run serve

Then open the address it prints.
