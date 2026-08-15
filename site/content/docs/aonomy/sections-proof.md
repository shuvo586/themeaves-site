# Sections: prices, testimonials and statistics

The middle group of the landing page sells: the price cards, what customers say, who is behind the
product, and the numbers that make the case. The testimonial section is the one section that is
interactive rather than static, a Bootstrap carousel.

---

## App prices section

The `#aonomy-app-prices` section, three price cards in a row.

```html
<!-- START AONOMY APP PRICES -->
<section id="aonomy-app-prices">
    <div class="container">

        <div class="aonomy-section-header">
            <div class="row">
                <div class="col-xl-12">
                    <h3>App Prices title</h3>
                    <p>App Prices subtitle</p>
                </div><!-- end .col-lg-12 -->
            </div><!-- end .row -->
        </div><!-- end .aonomy-section-header -->

        <div class="aonomoy-app-prices-container">
            <div class="row">
                App Prices Content
            </div><!-- end .row -->
        </div><!-- end .aonomy-app-prices-container -->

    </div><!-- end .container -->
</section><!-- end #aonomy-app-prices -->
<!-- END AONOMY APP PRICES -->
```

![The app prices section as shipped.](/docs/aonomy/section-prices.jpg)

## Testimonial section

The `#aonomy-testimonial` section is a Bootstrap carousel, narrowed to eight columns and centred.
The carousel markup is the standard Bootstrap one: `.carousel-inner` holds the slides, and the
controls sit in `.aonomy-testimonial-icon` below the carousel rather than on its edges.

```html
<!-- START AONOMY TESTIMONIAL SECTION -->
<section id="aonomy-testimonial" data-stellar-background-ratio="0.5">
    <div class="aonomy-testimonials-container">
        <div class="container">
            <div class="aonomy-section-header">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <h3>Testimonial title</h3>
                        <p>Testimonial subtitle</p>
                    </div><!-- end .col-lg-12 -->
                </div><!-- end .row -->
            </div><!-- end .aonomy-section-header -->

            <div id="anonomy-testimonial-carousel" class="aonomy-testimonial-container carousel slide" data-ride="carousel">
                <div class="row">
                    <div class="col-xl-8 offset-xl-2">
                        <div class="carousel-inner">
                            Testimonial content
                        </div><!-- end .corousel-inner -->
                    </div><!-- end .col-xl-8 -->
                </div><!-- end .row -->

                <div class="aonomy-testimonial-icon">
                    Testimonial control
                </div><!-- aonomy-testimonial-icon -->

            </div><!-- end .aonomy-testimonial-carousel -->
        </div><!-- end .container -->
    </div><!-- end .aonomy-testimonials-container-->

</section>
<!-- END AONOMY TESTIMONIAL SECTION -->
```

One slide is marked `.active` inside `.carousel-inner`; the others are plain `.carousel-item`
members.

![The testimonial section as shipped.](/docs/aonomy/section-testimonial.jpg)

## Team section

The `#aonomy-team` section, the team grid.

```html
<!-- START AONOMY TEAM SECTION -->
<section id="aonomy-team">
    <div class="container">

        <div class="aonomy-section-header">
            <div class="row">
                <div class="col-xl-12">
                    <h3>Our Team title</h3>
                    <p>Our Team subtitle</p>
                </div><!-- end .col-lg-12 -->
            </div><!-- end .row -->
        </div><!-- end .aonomy-section-header -->

        <div class="aonomy-team-container">
            <div class="row">
                Our Team content
            </div><!-- end .row -->
        </div><!-- end .aonomy-team-container -->

    </div><!-- end .container -->
</section><!-- end .aonomy-team -->

<!-- END AONOMY TEAM SECTION -->
```

![The team section as shipped.](/docs/aonomy/section-team.jpg)

## Statistics section

The `#aonomy-statistics` section is a single row of counters, animated by the counter-up and
waypoints plugins. Each number element has the `.aonomy-statistics-number` class, which
`app-*.js` hands to `jquery.counterup.js` to count up from zero when the section scrolls into
view.

```html
<!-- START AONOMY STATISTICS SECTION -->

<section id="aonomy-statistics" data-stellar-background-ratio="0.5">
    <div class="container">
        <div class="row">
            Statistics content
        </div><!-- end .row -->
    </div><!-- end .container -->
</section>

<!-- END AONOMY STATISTICS SECTION -->
```

![The statistics section as shipped.](/docs/aonomy/section-statistics.jpg)