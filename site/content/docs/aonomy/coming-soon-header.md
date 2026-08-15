# Coming soon header effects

The coming soon pages pair the same seven background effects with a single-purpose page: a
countdown and an email capture instead of a landing hero. The layout differs from the landing
header in two places. The navigation row is replaced by a contact strip, `.aonomy-coming-contact`,
and the header bottom holds the countdown rather than the hero copy.

The markup below is the shared skeleton. The effect variations are exactly the ones from the
landing header chapter: bubble, particles, snow and star carry the `#particles-js` div, parallax
and wave put `data-stellar-background-ratio="0.5"` on the `<header>` and drop it, and video swaps
it for `<div id="aonomy-video-banner"></div>`.

```html
<!-- START AONOMY HEADER SECTION -->
<header id="aonomy-header">
    <div id="particles-js"></div>
    <div class="aonomy-top">
        <div class="container">
            <div class="row">
                <div class="aonomy-logo-container col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                    Aonomy Logo
                </div><!-- end .aonomy-logo-container -->

                <div class="aonomy-navigation col-xl-9 col-lg-9 col-md-9 col-sm-6 col-6">
                    <div class="aonomy-coming-contact">
                        Aonomy Contact Navigation
                    </div>
                </div><!-- end .aonomy-navigation -->
            </div><!-- end .row -->
        </div><!-- end .container-->
    </div><!-- end .aonomy-top -->

    <div class="aonomy-header-bottom">
        <div class="container">
            <div class="row">
                Aonomy bottom details
            </div><!-- end .row -->
        </div><!-- end .container -->
    </div><!-- end .aonomy-header-bottom -->
</header>
<!-- END AONOMOY HEADER SECTION -->
```

## Effect to file mapping

| Effect | Stylesheet | Script | Canvas config |
|---|---|---|---|
| Bubble | `assets/css/style-coming-bubble.css` | `assets/js/app-coming-bubble.js` | `assets/json/bubble.json` |
| Particles | `assets/css/style-coming-particles.css` | `assets/js/app-coming-particles.js` | `assets/json/particles.json` |
| Snow | `assets/css/style-coming-snow.css` | `assets/js/app-coming-snow.js` | `assets/json/snow.json` |
| Star | `assets/css/style-coming-star.css` | `assets/js/app-coming-star.js` | `assets/json/star.json` |
| Parallax | `assets/css/style-coming-parallax.css` | `assets/js/app-coming-parallax.js` | - |
| Video | `assets/css/style-coming-video.css` | `assets/js/app-coming-video.js` | - |
| Wave | `assets/css/style-coming-wave.css` | `assets/js/app-coming-wave.js` | - |

## The countdown

The countdown target is set in the effect script, not in the page. Each `app-coming-*.js` hands
`jquery.countdown.js` a date and a set of `.aonomy-countdown-*` elements to fill:

```js
$('.aonomy-countdown').countdown('2019/01/01', function(event) {
  $('.aonomy-countdown-days').html(event.strftime('%D'));
  $('.aonomy-countdown-hours').html(event.strftime('%H'));
  $('.aonomy-countdown-minutes').html(event.strftime('%M'));
  $('.aonomy-countdown-seconds').html(event.strftime('%S'));
});
```

The shipped date is a placeholder. Replace the string with your launch date in `YYYY/MM/DD`
format in the effect script of the page you are using, and the four elements count down to it.

## Bubble effect

```html
<link rel="stylesheet" href="assets/css/style-coming-bubble.css">
<script src="assets/js/app-coming-bubble.js"></script>
```

![The coming soon bubble header.](/docs/aonomy/coming-bubble.jpg)

## Particles effect

```html
<link rel="stylesheet" href="assets/css/style-coming-particles.css">
<script src="assets/js/app-coming-particles.js"></script>
```

![The coming soon particles header.](/docs/aonomy/coming-particles.jpg)

## Snow effect

```html
<link rel="stylesheet" href="assets/css/style-coming-snow.css">
<script src="assets/js/app-coming-snow.js"></script>
```

![The coming soon snow header.](/docs/aonomy/coming-snow.jpg)

## Star effect

```html
<link rel="stylesheet" href="assets/css/style-coming-star.css">
<script src="assets/js/app-coming-star.js"></script>
```

![The coming soon star header.](/docs/aonomy/coming-star.jpg)

## Parallax effect

```html
<link rel="stylesheet" href="assets/css/style-coming-parallax.css">
<script src="assets/js/app-coming-parallax.js"></script>
```

![The coming soon parallax header.](/docs/aonomy/coming-parallax.jpg)

## Video effect

```html
<link rel="stylesheet" href="assets/css/style-coming-video.css">
<script src="assets/js/app-coming-video.js"></script>
```

![The coming soon video header.](/docs/aonomy/coming-video.jpg)

## Wave effect

```html
<link rel="stylesheet" href="assets/css/style-coming-wave.css">
<script src="assets/js/app-coming-wave.js"></script>
```

![The coming soon wave header.](/docs/aonomy/coming-wave.jpg)