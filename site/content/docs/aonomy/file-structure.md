# File structure

The package root holds one HTML page per layout, and `assets/` holds everything those pages load.
The layout families, their stylesheets, their scripts and the canvas configs are all covered here;
the form backends are covered in their sections chapters.

---

## HTML structure

Twenty-four pages in four families. The landing and coming soon families both pair a background
effect with a shared page; the blog pages share the archive or article structure.

| Family | Files | Purpose |
|---|---|---|
| **Landing** | `index-bubble.html` · `index-particles.html` · `index-snow.html` · `index-star.html` · `index-parallax.html` · `index-video.html` · `index-wave.html` | The full marketing page, one per header effect |
| **Coming soon** | `coming-soon-bubble.html` · `coming-soon-particles.html` · `coming-soon-snow.html` · `coming-soon-star.html` · `coming-soon-parallax.html` · `coming-soon-video.html` · `coming-soon-wave.html` | A single-purpose page with a countdown, one per effect |
| **Blog archive** | `blog-no-sidebar-1-column.html` · `blog-no-sidebar-2-column.html` · `blog-no-sidebar-3-column.html` · `blog-left-sidebar-1-column.html` · `blog-left-sidebar-2-column.html` · `blog-right-sidebar-1-column.html` · `blog-right-sidebar-2-column.html` | The news grid, with or without a sidebar |
| **Blog single** | `blog-no-sidebar-single.html` · `blog-left-sidebar-single.html` · `blog-right-sidebar-single.html` | One article with comments |

![The HTML files as they sit in the package.](/docs/aonomy/file-structure-html.jpg)

## CSS structure

All stylesheets live in `assets/css`. Each layout has its own file, named for the layout it styles,
and the library files are shared by every page.

**Layout files**

| Family | Files |
|---|---|
| Landing | `style-bubble.css` · `style-particles.css` · `style-snow.css` · `style-star.css` · `style-parallax.css` · `style-video.css` · `style-wave.css` |
| Coming soon | `style-coming-bubble.css` · `style-coming-particles.css` · `style-coming-snow.css` · `style-coming-star.css` · `style-coming-parallax.css` · `style-coming-video.css` · `style-coming-wave.css` |
| Blog archive | `style-blog-no-sidebar.css` · `style-blog-sidebar.css` |
| Blog single | `style-blog-single-no-sidebar.css` · `style-blog-single-sidebar.css` |

**Library files**

| File | What it provides |
|---|---|
| `bootstrap.css` | The Bootstrap 4 grid and components |
| `aos.css` | Animation on scroll |
| `icofont.css` | The Icofont icon font |
| `lity.css` | The lightbox used by the video play links |
| `owl.carousel.css` · `owl.theme.css` | The carousels |

![The CSS directory.](/docs/aonomy/file-structure-css.jpg)

## JS structure

All scripts live in `assets/js`. The app scripts are the ones to edit; the plugin files are
libraries and are not meant to be touched.

**App scripts**

| Family | Files |
|---|---|
| Landing | `app-bubble.js` · `app-particles.js` · `app-snow.js` · `app-star.js` · `app-parallax.js` · `app-video.js` · `app-wave.js` |
| Coming soon | `app-coming-bubble.js` · `app-coming-particles.js` · `app-coming-snow.js` · `app-coming-star.js` · `app-coming-parallax.js` · `app-coming-video.js` · `app-coming-wave.js` |
| Blog and blog single | `app-blog.js` |

**Plugin files**

`jquery.min.js` · `jquery-migrate.js` · `aos.js` · `bootstrap.js` · `jquery.counterup.js` ·
`waypoints.js` · `jquery.stellar.js` · `jquery.vide.js` · `lity.js` · `owl.carousel.js` ·
`particles.js` · `validator.js` · `jquery.countdown.js`

![The JS directory.](/docs/aonomy/file-structure-js.jpg)

## JSON structure

Four config files live in `assets/json`, read by the particle canvas. Each effect script loads the
file for its effect, so the density, colours and speed of the bubble, particles, snow and star
headers are tuned there rather than in the script.

| File | Used by |
|---|---|
| `bubble.json` | `app-bubble.js` and `app-coming-bubble.js` |
| `particles.json` | `app-particles.js` and `app-coming-particles.js` |
| `snow.json` | `app-snow.js` and `app-coming-snow.js` |
| `star.json` | `app-star.js` and `app-coming-star.js` |

![The JSON directory.](/docs/aonomy/file-structure-json.jpg)

## The rest of `assets/`

| Path | Holds |
|---|---|
| `assets/sass` | The Sass sources, including the `base/`, `layout/` and `utilities/` partials the layout files compile from |
| `assets/form` | `subscription.php` and `sendmail.php` with their `_config.php` partners, plus the `vendor/` and `mailchimp/` libraries |
| `assets/fonts` | The Icofont font in all four formats |
| `assets/video` | The phone clips the video header plays |
| `config.rb` | The Compass configuration, at the package root rather than inside `assets/` |