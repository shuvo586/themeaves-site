/**
 * The ThemeAves bird.
 *
 * Two variants, and the split is not cosmetic. Below about 64px the detailed
 * bird's outline strokes, eye and fold shadows close up and it reads as a
 * smudge. `BirdMark` is the small variant and is what the header lockup uses;
 * `BirdMarkDetail` keeps the eye, the outline and the upper wing ring and is
 * for large placements only.
 *
 * `BirdMark` keeps the three wing bars. It is NOT a bare silhouette: a version
 * that dropped the bars was rejected because a bird silhouette carries none of
 * the brand. Thin things die first at a small size, solid colour dies last, so
 * the outline goes and the bars stay. Both variants run two colour modes off
 * one geometry, single colour by default and multicolour on opt in; see
 * brand.css.
 *
 * Geometry is brand/mark.svg coordinate for coordinate. Only the colour roles
 * changed, because the four hexes it was drawn in belong to the retired
 * palette. Keep these path strings in sync with public/brand/bird*.svg, which
 * are the static copies the favicon pipeline reads.
 */

/** The three wing bars. These are the mark: a bird silhouette on its own is
 *  generic, and an earlier version of the small variant that dropped them was
 *  rejected on sight. They are cut back out of the silhouette rather than
 *  drawn over it, so there is no stroke to collapse at a small size. */
const BARS = [
  'M642.9,175.44 L579.42,211.9 L223.56,211.9 L220.28,202.77 L210.51,175.44 Z',
  'M533.96,238 L469.39,274.46 L245.96,274.46 L242.67,265.33 L232.9,238 Z',
  'M415.23,304 L355.53,336.59 L348.44,340.46 L269.57,340.46 L266.31,331.33 L256.52,304 Z',
];

/** wing, body, head, tail. Overlapping, and one fill unions them. */
const SILHOUETTE = [
  'M222.72,416.74 L114.8,150.11 L687.01,150.11 Z',
  'm175.44,32.66C114.8-10.99,65.39,13.17,48.18,47.88l-27.06,54.6-4.36,8.79c9.51-2.2,21.38-.35,32.24,5.03l66.3,32.86-.49.96,107.92,266.62-86.28,117.93h132.27l66.1-182.3,17.54-202.25L175.44,32.66Z',
  'm286.71,121.37h12.2L131.68,17.23S58.41,8.54,44.58,55.15h0c73.33,43.35,156.95,66.22,242.14,66.22Z',
  'M203.92,482.71 L180.1,534.66 L268.71,534.66 L305.83,432.3 Z',
];

/** The measured bbox of those four shapes, so the mark carries no padding of
 *  its own and whatever places it controls its own spacing. */
const SILHOUETTE_BOX = '16.76 9.13 670.25 525.54';

/**
 * The bird faces RIGHT, which is the live ThemeAves identity as published on
 * the ThemeForest profile. `brand/mark.svg` is drawn facing left, so every
 * shipping surface mirrors it rather than re-drawing it: the path data below
 * stays identical to the master coordinate for coordinate and only the
 * reflection differs.
 *
 * Each is an exact reflection about the horizontal centre of its own viewBox,
 * so the bbox is unchanged and nothing that places the mark has to compensate.
 *   compact  minX 16.76 + maxX 687.01 = 703.77
 *   detail   minX 0     + maxX 721.23 = 721.23
 */
const MIRROR_COMPACT = 'translate(703.77 0) scale(-1 1)';
const MIRROR_DETAIL = 'translate(721.23 0) scale(-1 1)';

const BODY =
  'm175.44,32.66C114.8-10.99,65.39,13.17,48.18,47.88l-27.06,54.6-4.36,8.79c9.51-2.2,21.38-.35,32.24,5.03l66.3,32.86-.49.96,107.92,266.62-86.28,117.93h132.27l66.1-182.3,17.54-202.25L175.44,32.66Z';
const WING = 'M222.72,416.74 L114.8,150.11 L687.01,150.11 Z';

type MarkProps = React.SVGProps<SVGSVGElement> & {
  /** Decorative next to a wordmark that already says the name; labelled when
   *  it stands alone. Defaults to decorative, which is the common case. */
  title?: string;
};

export function BirdMark({ title, className, ...rest }: MarkProps) {
  return (
    <svg
      viewBox={SILHOUETTE_BOX}
      className={className}
      fill="currentColor"
      {...rest}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g transform={MIRROR_COMPACT}>
        <g fill="var(--ta-mark-ink, currentColor)">
          {SILHOUETTE.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {BARS.map((d, i) => (
          <path
            key={d}
            d={d}
            fill={`var(--ta-bar-${i + 1}, var(--ta-mark-field, transparent))`}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * The detailed bird. Above 64px only.
 *
 * Colour roles, driven by custom properties so a placement can retune it
 * without a second file:
 *   --ta-mark-ink       structure, eye, fold shadows. Defaults to currentColor
 *   --ta-mark-field     the knockouts, which should match the surface behind
 *   --ta-mark-accent    the single-colour fallback for everything below
 *   --ta-bar-1/2/3      the three brand hues, when the mark runs multicolour
 *
 * Each hue is used exactly twice, which is how the master assigns them:
 *   --ta-bar-1  head          and wing bar 1   (sun)
 *   --ta-bar-2  tail          and wing bar 2   (tide)
 *   --ta-bar-3  upper flash   and wing bar 3   (flare)
 *
 * They fall back to --ta-mark-accent, which falls back to currentColor, so the
 * mark still collapses cleanly to one colour wherever it has to. See brand.css.
 */
export function BirdMarkDetail({ title, className, ...rest }: MarkProps) {
  return (
    <svg
      viewBox="0 0 721.23 543.79"
      className={className}
      {...rest}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}

      <g transform={MIRROR_DETAIL}>

      <g fill="var(--ta-mark-ink, currentColor)">
        {/* upper wing, a ring: outer triangle less the inner one */}
        <path
          fillRule="evenodd"
          d="m269.53,399.59L100.17,144.58,599.95,10.67l-330.43,388.93Zm-140.1-243.95l141.89,213.65L548.15,43.45l-418.72,112.2Z"
        />
        <path
          fill="var(--ta-bar-3, var(--ta-mark-accent, currentColor))"
          d="M311.37,122.91 L542.62,63.87 L494.16,106.99 L352.35,150.11 Z"
        />
      </g>

      <path fill="var(--ta-mark-field, transparent)" d={BODY} />
      <path
        fill="var(--ta-bar-1, var(--ta-mark-accent, currentColor))"
        d="m286.71,121.37h12.2L131.68,17.23S58.41,8.54,44.58,55.15h0c73.33,43.35,156.95,66.22,242.14,66.22Z"
      />
      <path
        fill="var(--ta-bar-2, var(--ta-mark-accent, currentColor))"
        d="M203.92,482.71 L180.1,534.66 L268.71,534.66 L305.83,432.3 Z"
      />

      <g
        fill="none"
        stroke="var(--ta-mark-ink, currentColor)"
        strokeMiterlimit={10}
        strokeWidth={18.26}
      >
        <path d="M340.38,153.02 L504.61,110.38" />
        <path d={BODY} />
      </g>

      <g fill="var(--ta-mark-ink, currentColor)">
        <path d="M203.92,482.71 L180.1,530.45 L196.29,538.88 L224.5,482.71 Z" />
        <path d="M240.12,482.71 L218.79,531.01 L235.52,538.32 L260.05,482.71 Z" />
        <path d="m110.6,63.87c0,5.76-4.67,10.44-10.44,10.44s-10.44-4.67-10.44-10.44,4.67-10.44,10.44-10.44,10.44,4.67,10.44,10.44Z" />
      </g>

      <path fill="var(--ta-mark-field, transparent)" d={WING} />
      <g>
        <path
          fill="var(--ta-bar-1, var(--ta-mark-accent, currentColor))"
          d="M642.9,175.44 L579.42,211.9 L223.56,211.9 L220.28,202.77 L210.51,175.44 Z"
        />
        <path
          fill="var(--ta-bar-2, var(--ta-mark-accent, currentColor))"
          d="M533.96,238 L469.39,274.46 L245.96,274.46 L242.67,265.33 L232.9,238 Z"
        />
        <path
          fill="var(--ta-bar-3, var(--ta-mark-accent, currentColor))"
          d="M415.23,304 L355.53,336.59 L348.44,340.46 L269.57,340.46 L266.31,331.33 L256.52,304 Z"
        />
      </g>
      <g fill="var(--ta-mark-ink, currentColor)">
        <path d="M579.42,202.77 L579.42,221.02 L226.82,221.02 L223.56,211.9 L220.28,202.77 Z" />
        <path d="M468.97,265.33 L468.97,283.59 L249.21,283.59 L245.96,274.46 L242.67,265.33 Z" />
        <path d="M355.53,331.33 L355.53,349.58 L272.83,349.58 L266.31,331.33 Z" />
      </g>
      <path
        fill="none"
        stroke="var(--ta-mark-ink, currentColor)"
        strokeMiterlimit={10}
        strokeWidth={18.26}
        d={WING}
      />

      </g>
    </svg>
  );
}
