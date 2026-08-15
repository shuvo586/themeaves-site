# Blog single pages

The three article pages share the header and title band from the archive layouts, then carry one
article, its comments and the comment form. The layout choice is which side, if any, the sidebar
sits on.

Every article page ends with the comment block: a `#comments` container for the existing comments
and a `.aonomy-comment-form` for the form to add one.

## Layout to markup mapping

| Layout | Article column | Sidebar | Stylesheet |
|---|---|---|---|
| No sidebar | `col-xl-12` | none | `style-blog-single-no-sidebar.css` |
| Left sidebar | `col-xl-8` after `col-xl-4` | `col-xl-4` first | `style-blog-single-sidebar.css` |
| Right sidebar | `col-xl-8` before `col-xl-4` | `col-xl-4` last | `style-blog-single-sidebar.css` |

All three use `app-blog.js`.

## No sidebar

```html
<!-- START AONOMY NEWS SECTION -->
<div class="container">
    <div class="row">

        <div class="col-xl-12">
            <section id="aonomy-news">
                <div class="aonomy-news-container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            blog single news
                        </div><!-- end .col-xl-12 -->
                    </div><!--end .row -->
                </div><!-- end .aonomy-news-container -->
            </section>
            <div class="aonomy-comment-container">
                <div id="comments">
                    Blog Comments
                </div><!-- #comments -->

                <div class="aonomy-comment-form">
                    Blog Comment Form
                </div><!-- end .aonomy-comment-form -->
            </div><!-- aonomy-comment-container -->
        </div><!-- end .col-xl-12 -->
    </div><!-- end .row -->
</div><!-- end .container -->

<!-- END AONOMY NEWS SECTION -->
```

```html
<link rel="stylesheet" href="assets/css/style-blog-single-no-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The article page without a sidebar.](/docs/aonomy/blog-single-no-sidebar.jpg)

## Left sidebar

The aside comes first in the row, then the article and comments in the `col-xl-8`.

```html
<!-- START AONOMY NEWS SECTION -->
<div class="container">
    <div class="row">
        <div class="col-xl-4">
            <aside class="aonomy-sidebar">
                Blog single sidebar
            </aside><!-- end .aonomy-sidebar -->
        </div><!-- end .col-xl-4 -->

        <div class="col-xl-8">
            <section id="aonomy-news">
                <div class="aonomy-news-container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            blog single news
                        </div><!-- end .col-xl-12 -->
                    </div><!--end .row -->
                </div><!-- end .aonomy-news-container -->
            </section>
            <div class="aonomy-comment-container">
                <div id="comments">
                    Blog Comments
                </div><!-- #comments -->

                <div class="aonomy-comment-form">
                    Blog Comment Form
                </div><!-- end .aonomy-comment-form -->
            </div><!-- aonomy-comment-container -->
        </div><!-- end .col-xl-8 -->
    </div><!-- end .row -->
</div><!-- end .container -->

<!-- END AONOMY NEWS SECTION -->
```

```html
<link rel="stylesheet" href="assets/css/style-blog-single-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The article page with a left sidebar.](/docs/aonomy/blog-single-left-sidebar.jpg)

## Right sidebar

The article and comments come first, then the aside.

```html
<!-- START AONOMY NEWS SECTION -->
<div class="container">
    <div class="row">

        <div class="col-xl-8">
            <section id="aonomy-news">
                <div class="aonomy-news-container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            blog single news
                        </div><!-- end .col-xl-12 -->
                    </div><!--end .row -->
                </div><!-- end .aonomy-news-container -->
            </section>
            <div class="aonomy-comment-container">
                <div id="comments">
                    Blog Comments
                </div><!-- #comments -->

                <div class="aonomy-comment-form">
                    Blog Comment Form
                </div><!-- end .aonomy-comment-form -->
            </div><!-- aonomy-comment-container -->
        </div><!-- end .col-xl-8 -->

        <div class="col-xl-4">
            <aside class="aonomy-sidebar">
                Blog single sidebar
            </aside><!-- end .aonomy-sidebar -->
        </div><!-- end .col-xl-4 -->
    </div><!-- end .row -->
</div><!-- end .container -->

<!-- END AONOMY NEWS SECTION -->
```

```html
<link rel="stylesheet" href="assets/css/style-blog-single-sidebar.css">
<script src="assets/js/app-blog.js"></script>
```

![The article page with a right sidebar.](/docs/aonomy/blog-single-right-sidebar.jpg)