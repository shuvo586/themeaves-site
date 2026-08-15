# Getting started

Aonomy is an app landing page template for Bootstrap 4, built from Sass. The package ships 24 HTML
pages in four families: seven landing pages, seven coming soon pages, seven blog archive pages and
three blog single pages. The landing and coming soon families share the same page underneath; the
member that defines them is the header treatment it pairs with.

The template is meant to be customised by hand, so basic HTML and CSS knowledge is all that is
required. The Sass sources are included if you want to work at that level, and the compiled
stylesheets are included if you do not.

---

## What the package contains

| Path | Holds |
|---|---|
| Page root | The 24 HTML pages, one per layout |
| `assets/css` | The compiled stylesheets, one per layout plus the shared libraries |
| `assets/sass` | The Sass sources the stylesheets compile from |
| `assets/js` | One app script per layout, plus the plugin files they load |
| `assets/json` | The canvas effect configs the header scripts read |
| `assets/form` | The MailChimp and PHPMailer backends for the two forms |
| `assets/fonts` | The Icofont icon font |
| `assets/video` | The phone clips the video header plays behind its content |
| `config.rb` | The Compass configuration for compiling the Sass |

## What you need

To edit page content and the compiled CSS, a text editor is enough. To work on the Sass instead,
you need a Sass compiler; the package targets Compass, and `config.rb` at the package root is the
configuration for it. Rebuild into `assets/css` keeping the same file names, or edit the compiled
files directly. The two routes do not mix: pick one per file.

## If a question is not covered here

Contact us through the support centre at
[`support.themeaves.com`](https://support.themeaves.com) or by email at
[`support@themeaves.com`](mailto:support@themeaves.com). Include the purchase code, the page you
are working on and the browser and operating system you are seeing the problem in.