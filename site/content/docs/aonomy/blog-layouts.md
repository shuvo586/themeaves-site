# Blog archive layouts

The seven archive pages share the page skeleton and differ in the news grid. Every page opens
with the header's top row and a title band, `#aonomy-blog-title`, whose `#particles-js` div runs
the same particle canvas as the landing headers, then the news grid itself. Every layout uses the
same script, `app-blog.js`, and one of two stylesheets depending on whether a sidebar is present.

## The shared skeleton

```html
<!-- START AONOMY HEADER SECTION -->
<header id="aonomy-header">
    <div class="aonomy-top">
        <div class="container">
            <div class="row">
                <div class="aonomy-logo-container col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                    Aonomy Logo
                </div><!-- end .aonomy-logo-container -->

                <div class="aonomy-navigation col-xl-9 col-lg-9 col-md-9 col-sm-6 col-6">
                    Aonomy Navigation
                </div><!-- end .aonomy-navigation -->
            </div><!-- end .row -->
        </div><!-- end .container-->
    </div><!-- end .aonomy-top -->
</header>
<!-- END AONOMOY HEADER SECTION -->

<!-- START AONOMY BLOG TITLE -->
<section id="aonomy-blog-title">
    <div class="aonomy-blog-header-bottom">
        <div id="particles-js"></div>
        <div class="aonomy-header-details">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        Blog Title
                    </div><!-- end .col-xl-12 -->
                </div><!-- end .row -->
            </div><!-- end .container -->
        </div><!-- end .aonomy-header-details -->
    </div><!-- end .aonomy-header-bottom -->
</section>
<!-- END AONOMY BLOG TITLE -->
```

## Layout to column mapping

| Layout | News columns | Sidebar | Stylesheet |
|---|---|---|---|
| 1 column, no sidebar | `col-xl-12` | none | `style-blog-no-sidebar.css` |
| 2 column, no sidebar | `col-xl-6` | none | `style-blog-no-sidebar.css` |
| 3 column, no sidebar | `col-xl-4` | none | `style-blog-no-sidebar.css` |
| 1 column, left sidebar | `col-xl-12` inside `col-xl-8` | `col-xl-4` first | `style-blog-sidebar.css` |
| 2 column, left sidebar | `col-xl-6` inside `col-xl-8` | `col-xl-4` first | `style-blog-sidebar.css` |
| 1 column, right sidebar | `col-xl-12` inside `col-xl-8` | `col-xl-4` last | `style-blog-sidebar.css` |
| 2 column, right sidebar | `col-xl-6` inside `col-xl-8` | `col-xl-4` last | `style-blog-sidebar.css` |

The archive itself is the news section from the landing page, `#aonomy-news`, filled with one
`.aonomy-news-item` per post and closed by a pagination row.

## 1 column, no sidebar

```html
<!-- START AONOMY NEWS SECTION -->
<section id="aonomy-news">
    <div class="container">
        <div class="aonomy-news-container">
            <div class="row">

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    Aonomy News Content
                </div><!-- end .col-xl-12 -->

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    Aonomy News Content
                </div><!-- end .col-xl-12 -->

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    Aonomy News Content
                </div><!-- end .col-xl-12 -->

                <div class="col-xl-12">
                    Aonomy Pagination
                </div><!-- end .col-xl-12 -->

            </div><!-- end .row -->
        </div><!-- end .aonomy-news-container -->
    </div><!-- end .container -->
</section>
<!-- END AONOMY NEWS SECTION -->
```

```html
<link rel="stylesheet" href="assets/css/style-blog-no-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The one-column, no-sidebar archive.](/docs/aonomy/blog-no-sidebar-1.jpg)

## 2 column, no sidebar

The same skeleton with `col-xl-6` posts.

```html
<link rel="stylesheet" href="assets/css/style-blog-no-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The two-column, no-sidebar archive.](/docs/aonomy/blog-no-sidebar-2.jpg)

## 3 column, no sidebar

The same skeleton with `col-xl-4` posts.

```html
<link rel="stylesheet" href="assets/css/style-blog-no-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The three-column, no-sidebar archive.](/docs/aonomy/blog-no-sidebar-3.jpg)

## 1 column, left sidebar

The sidebar sits outside the news section, in the container that wraps it. The aside comes
first in the row, so it reads left to right as sidebar then posts.

```html
<!-- START AONOMY NEWS SECTION -->
<div class="container">
    <div class="row">
        <div class="col-xl-4">
            <aside class="aonomy-sidebar">
                Aonomy Sidebar
            </aside><!-- end .aonomy-sidebar -->
        </div><!-- end .col-xl-4 -->
        <div class="col-xl-8">
            <section id="aonomy-news">
                <div class="aonomy-news-container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            Aonomy News
                        </div><!-- end .col-xl-12 -->

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            Aonomy News
                        </div><!-- end .col-xl-12 -->

                        <div class="col-xl-12">
                            Aonomy Pagination
                        </div><!-- end .col-xl-12 -->
                    </div><!--end .row -->
                </div><!-- end .aonomy-news-container -->
            </section>
        </div><!-- end .col-xl-8 -->

    </div><!-- end .row -->
</div><!-- end .container -->

<!-- END AONOMY NEWS SECTION -->
```

```html
<link rel="stylesheet" href="assets/css/style-blog-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The one-column archive with a left sidebar.](/docs/aonomy/blog-left-sidebar-1.jpg)

## 2 column, left sidebar

The same wrapper with `col-xl-6` posts inside the `col-xl-8` column.

```html
<link rel="stylesheet" href="assets/css/style-blog-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The two-column archive with a left sidebar.](/docs/aonomy/blog-left-sidebar-2.jpg)

## 1 column, right sidebar

The news section comes first in the row and the aside follows it.

```html
<!-- START AONOMY NEWS SECTION -->
<div class="container">
    <div class="row">
        <div class="col-xl-8">
            <section id="aonomy-news">
                <div class="aonomy-news-container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            Aonomy News
                        </div><!-- end .col-xl-12 -->

                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            Aonomy News
                        </div><!-- end .col-xl-12 -->

                        <div class="col-xl-12">
                            Aonomy Pagination
                        </div><!-- end .col-xl-12 -->
                    </div><!--end .row -->
                </div><!-- end .aonomy-news-container -->
            </section>
        </div><!-- end .col-xl-8 -->
        <div class="col-xl-4">
            <aside class="aonomy-sidebar">
                Aonomy Sidebar
            </aside><!-- end .aonomy-sidebar -->
        </div><!-- end .col-xl-4 -->
    </div><!-- end .row -->
</div><!-- end .container -->

<!-- END AONOMY NEWS SECTION -->
```

```html
<link rel="stylesheet" href="assets/css/style-blog-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The one-column archive with a right sidebar.](/docs/aonomy/blog-right-sidebar-1.jpg)

## 2 column, right sidebar

The same wrapper with `col-xl-6` posts inside the `col-xl-8` column.

```html
<link rel="stylesheet" href="assets/css/style-blog-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The two-column archive with a right sidebar.](/docs/aonomy/blog-right-sidebar-2.jpg)