import type { Metadata } from 'next';
import { BirdMark, BirdMarkDetail } from '@/components/brand/BirdMark';
import { Lockup } from '@/components/brand/Lockup';
import { ThemeToggle } from '@/components/dev/ThemeToggle';

export const metadata: Metadata = {
  title: 'Brand',
  robots: { index: false, follow: false },
};

/* The sizes the mark actually renders at in the wild. 16 is the browser tab
   and it is the one that decides whether a mark works. */
const SMALL_SIZES = [16, 20, 24, 32, 48, 64];

const FILES = [
  ['public/brand/bird-compact.svg', 'Silhouette. Below 64px. Source for every generated icon.'],
  ['public/brand/bird.svg', 'Full detail. Above 64px only.'],
  ['public/brand/favicon.svg', 'Bird reversed out of the pinned accent plane, 32 unit grid.'],
  ['public/brand/icon-maskable.svg', 'Same at 68%, inside the 80% safe circle.'],
  ['public/brand/favicon.ico', '16, 32 and 48 packed. Windows and Safari pinned tabs.'],
  ['public/brand/favicon-16.png', 'Generated.'],
  ['public/brand/favicon-32.png', 'Generated.'],
  ['public/brand/favicon-48.png', 'Generated.'],
  ['public/brand/apple-touch-icon.png', '180. Generated.'],
  ['public/brand/icon-192.png', 'Generated.'],
  ['public/brand/icon-512.png', 'Generated.'],
  ['public/brand/icon-maskable-512.png', 'Generated, maskable.'],
];

function Section({ label, title, children }: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-24">
      <div className="rule">
        <span className="label">{label}</span>
      </div>
      <h2 className="mt-2 mb-6 font-display text-[1.625rem] leading-[1.15] font-bold tracking-[-0.01em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BrandProof() {
  return (
    <main className="mx-auto max-w-[75rem] px-6 py-16 md:px-12">
      <header className="pb-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="label">
            ThemeAves · direction 1a Blueprint · mark and icon set · not in the sitemap
          </span>
          <ThemeToggle />
        </div>
        <h1 className="mt-6 max-w-[20ch] font-display text-[length:var(--text-display)] leading-[1.04] font-extrabold tracking-[-0.025em]">
          One bird, two variants, and the small one is the one that matters.
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-muted">
          The mark is the existing ThemeAves bird, retoned for 1a rather than redrawn.
          Its geometry is unchanged coordinate for coordinate. What changed is the
          colour roles: the four hexes it was drawn in belong to the retired palette,
          and the three wing bars that were sun, tide and flare are now a single role.
          Everything below is rendered at true size. Flip the theme and check it again.
        </p>
      </header>

      <Section label="01 · lockup" title="Sizes, and the wordmark on its own">
        {/* What the chrome actually ships: brand/mark.svg in full, in its
            published colours. It is first because it is the one a visitor
            sees, and the reduced sizes below are the fallbacks. */}
        <div className="border border-line p-8">
          <Lockup variant="detail" colour asLink={false} />
          <p className="label mt-6">md · detail · colour · header and footer</p>
        </div>

        <div className="mt-8 flex flex-wrap items-end gap-12">
          <div>
            <Lockup size="sm" asLink={false} />
            <p className="label mt-3">sm · 15px · compact</p>
          </div>
          <div>
            <Lockup asLink={false} />
            <p className="label mt-3">md · 19px · compact</p>
          </div>
          <div>
            <Lockup size="lg" asLink={false} />
            <p className="label mt-3">lg · 24px · compact</p>
          </div>
          <div>
            <Lockup mark="none" asLink={false} />
            <p className="label mt-3">wordmark only</p>
          </div>
        </div>
        <p className="mt-8 max-w-[var(--measure)] text-muted">
          The wordmark is set to the published lockup on the ThemeForest profile banner:
          THEME AVES, all capitals, one weight at 800, tracked at 0.08em, with a word
          space between the halves. It ran mixed case with Theme at 500 against Aves at
          800 until 2026-08-13. That weight contrast was invented here and the banner has
          no such split, so it is gone. Archivo is variable across 400 to 800, so 800
          costs no extra file and the budget stays at three of its ceiling of four.
        </p>
      </Section>

      <Section label="02 · contexts" title="Every surface the lockup sits on">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-line bg-bg p-8">
            <Lockup asLink={false} />
            <p className="label mt-6">on --color-bg</p>
          </div>
          <div className="border border-line bg-surface p-8">
            <Lockup asLink={false} />
            <p className="label mt-6">on --color-surface</p>
          </div>
          <div data-on-accent className="bg-accent-plane p-8">
            <Lockup asLink={false} />
            <p className="label mt-6 text-on-accent">on the pinned plane</p>
          </div>
        </div>
        <p className="mt-8 max-w-[var(--measure)] text-muted">
          The bird inherits currentColor, so it is ink on paper, chalk in dark and white
          on the plane with no variant files and nothing to keep in sync. The plane and
          its text partner are both pinned, so white there is correct rather than a token
          violation.
        </p>
      </Section>

      <Section label="03 · the 16px test" title="Where a mark is won or lost">
        <div className="flex flex-wrap items-end gap-8">
          {SMALL_SIZES.map((s) => (
            <div key={s}>
              <BirdMark
                className="ta-mark text-ink"
                style={{ height: s, width: 'auto' }}
                title={`ThemeAves at ${s} pixels`}
              />
              <p className="label mt-3 tabular">{s}px</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-end gap-8">
          {SMALL_SIZES.map((s) => (
            <div key={s}>
              <BirdMark
                className="ta-mark"
                data-colour
                style={{ height: s, width: 'auto' }}
                title={`ThemeAves in colour at ${s} pixels`}
              />
              <p className="label mt-3 tabular">{s}px · colour</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[var(--measure)] text-muted">
          The small mark keeps the three wing bars and drops the outline, not the other
          way round. Thin things die first at this size and a solid area of colour dies
          last, so the 18px stroke, the eye, the fold shadows and the upper wing ring all
          go and the bars stay. The four shapes union into one fill, so the edge of the
          shape is the outline, and the bars are cut back out of it.
        </p>
        <p className="mt-4 max-w-[var(--measure)] text-muted">
          An earlier version dropped the bars instead and kept only the silhouette. It was
          rejected on sight and it was the right call: a bird silhouette is generic, and
          the bars are the thing that makes this mark ours. Compare the two rows at 16px.
          The single-colour bars have nearly merged, but in colour the hues still separate,
          which is why the marketplace avatar reads small and the silhouette did not.
        </p>
      </Section>

      <Section label="04 · detail" title="The full mark, above 64px only">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="border border-line bg-bg p-8">
            <BirdMarkDetail
              className="ta-mark-detail h-32 w-auto"
              title="ThemeAves"
            />
            <p className="label mt-6">monochrome · the default</p>
          </div>
          <div className="border border-line bg-surface p-8">
            <BirdMarkDetail
              className="ta-mark-detail h-32 w-auto"
              data-on-surface
              data-colour
              title="ThemeAves"
            />
            <p className="label mt-6">colour · the published logo</p>
          </div>
          <div data-on-accent className="bg-accent-plane p-8">
            <BirdMarkDetail className="ta-mark-detail h-32 w-auto" title="ThemeAves" />
            <p className="label mt-6 text-on-accent">on the pinned plane</p>
          </div>
        </div>
        <p className="mt-8 max-w-[var(--measure)] text-muted">
          Single colour is the default because it inherits, so it cannot be wrong: the
          bird is ink on paper, chalk in dark and white on the plane with nothing to keep
          in sync. Colour pins four literal hexes and is only correct on a ground those
          four were drawn against, so it is opted into per placement rather than assumed.
        </p>
      </Section>

      <Section label="05 · icon set" title="The generated files, at true size">
        <div className="scroll overflow-x-auto">
          <div className="flex min-w-max items-end gap-8">
            {[
              ['favicon-16.png', 16],
              ['favicon-32.png', 32],
              ['favicon-48.png', 48],
              ['apple-touch-icon.png', 180],
              ['icon-maskable-512.png', 180],
            ].map(([file, size]) => (
              <div key={file as string}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/brand/${file}`}
                  width={size as number}
                  height={size as number}
                  alt={`ThemeAves icon, ${file}`}
                />
                <p className="label mt-3 tabular">{file}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-line p-6" style={{ background: '#F4F5F7' }}>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/favicon-16.png" width={16} height={16} alt="" />
              <span style={{ color: '#14181F', fontSize: 13 }}>ThemeAves</span>
            </div>
            <p className="label mt-6">a light tab strip</p>
          </div>
          <div className="border border-line p-6" style={{ background: '#202124' }}>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/favicon-16.png" width={16} height={16} alt="" />
              <span style={{ color: '#E8EAED', fontSize: 13 }}>ThemeAves</span>
            </div>
            <p className="label mt-6" style={{ color: '#9AA0A6' }}>
              a dark tab strip
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-[var(--measure)] text-muted">
          Reversed out of the accent plane rather than drawn in ink, and that is the
          decision that makes one file serve every context. The plane is pinned
          identically in both themes, so the favicon is correct against a light tab
          strip, a dark one, a bookmark bar and a home screen. An ink bird on a
          transparent field is the failure most hand-built favicons ship with.
        </p>
      </Section>

      <Section label="06 · files" title="What exists, and what generates what">
        <div className="scroll overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="label border-b border-line px-4 py-2 text-start">File</th>
                <th className="label border-b border-line px-4 py-2 text-start">Role</th>
              </tr>
            </thead>
            <tbody>
              {FILES.map(([file, role]) => (
                <tr key={file}>
                  <td className="border-b border-line px-4 py-2 font-mono text-xs whitespace-nowrap">
                    {file}
                  </td>
                  <td className="border-b border-line px-4 py-2 text-muted">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-[var(--measure)] text-muted">
          Every PNG and the .ico are generated by <code className="font-mono text-xs">node
          tools/icons.cjs</code> from favicon.svg and icon-maskable.svg. Never edit one by
          hand: re-run the tool and the whole set moves together. Rendering happens at the
          target size rather than by downscaling a large bitmap, so 16px gets the
          browser&apos;s own hinting instead of a blurred 512.
        </p>
      </Section>
    </main>
  );
}
