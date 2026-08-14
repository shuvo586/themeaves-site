import Link from 'next/link';
import { BirdMark, BirdMarkDetail } from './BirdMark';

type LockupProps = {
  /** 'sm' for tight chrome such as the mobile drawer, 'lg' for the footer
   *  brand block and the error pages. Header is the default. */
  size?: 'sm' | 'md' | 'lg';
  /** Drop the bird and run the wordmark alone. Not a placeholder state: brief
   *  section 0 requires the site to look finished on the wordmark by itself. */
  mark?: 'bird' | 'none';
  /** Which drawing. 'detail' is `brand/mark.svg` in full: the outline, the eye,
   *  the fold shadows and the upper wing ring. 'compact' is the reduced
   *  silhouette-and-bars variant. The chrome runs 'detail', which is why
   *  `--ta-mark-h` steps up with it; see brand.css. */
  variant?: 'compact' | 'detail';
  /** Run the mark in the published colours of `brand/mark.svg` rather than
   *  letting it inherit. Opt in, because colour pins four literal hexes and is
   *  only correct on a ground they were drawn against; see brand.css. The
   *  chrome opts in, so header and footer carry the real logo. */
  colour?: boolean;
  /** The lockup is a link to home everywhere except on home itself, where a
   *  link to the current page is noise for a screen reader. */
  asLink?: boolean;
  className?: string;
};

export function Lockup({
  size = 'md',
  mark = 'bird',
  variant = 'compact',
  asLink = true,
  colour = false,
  className,
}: LockupProps) {
  const Mark = variant === 'detail' ? BirdMarkDetail : BirdMark;

  const inner = (
    <>
      <Mark
        className={variant === 'detail' ? 'ta-mark ta-mark-detail' : 'ta-mark'}
        data-colour={colour ? '' : undefined}
      />
      {/* Two words, as the banner sets it. The brand name is still ThemeAves
          everywhere it is prose; the lockup is the one place it is drawn. */}
      <span className="ta-wordmark">Theme Aves</span>
    </>
  );

  const props = {
    className: ['ta-lockup', className].filter(Boolean).join(' '),
    'data-size': size === 'md' ? undefined : size,
    'data-mark': mark === 'bird' ? undefined : mark,
    'data-variant': variant === 'compact' ? undefined : variant,
  };

  if (!asLink) {
    return <span {...props}>{inner}</span>;
  }

  return (
    <Link href="/" {...props}>
      {inner}
    </Link>
  );
}
