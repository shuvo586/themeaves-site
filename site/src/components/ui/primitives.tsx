import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { isPending, type Maybe } from '@/data/site';

/* --------------------------------------------------------------------------
   Container
   -------------------------------------------------------------------------- */
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  /* 1280 with 48px gutters, taken from the handoff prototypes, not 1200.
     Every rail, divider and column edge in those files is measured off this,
     so changing it moves the whole page off the design. */
  return (
    <div className={`mx-auto w-full max-w-[80rem] px-6 md:px-12 ${className}`}>{children}</div>
  );
}

/* --------------------------------------------------------------------------
   Section

   Opens on the section rail, the handoff prototype's signature device: a
   dashed rule with a mono coordinate label at the left end. Sections do
   not open on a centred eyebrow, and nothing here is a card.
   -------------------------------------------------------------------------- */
export function Section({
  index,
  label,
  children,
  className = '',
  id,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="rail">
          <span className="label">
            {index} · {label}
          </span>
        </div>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------------
   The handoff page grammar

   Every prototype in _dev/handoff/directions-preference/project/ opens the
   same way and divides sections the same way. These three components are that
   grammar, so a new route inherits it instead of reinventing it.
   -------------------------------------------------------------------------- */

/** A dashed rule with a mono label at each end. The section's own header. */
export function Rail({
  left,
  right,
  className = '',
}: {
  left: string;
  right?: string;
  className?: string;
}) {
  return (
    <div className={`rail ${className}`}>
      <span>{left}</span>
      {right ? <span>{right}</span> : null}
    </div>
  );
}

/**
 * The page opener: breadcrumb rail, blue mono eyebrow, display heading, lead.
 * Sits on --color-bg, and the section after it goes on --color-surface.
 */
export function PageHero({
  crumb,
  meta,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumb: string;
  meta?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Container>
      <div className="pt-6">
        <Rail left={crumb} right={meta} />
      </div>
      <div className="py-16 md:py-20">
        <p className="label text-accent">{eyebrow}</p>
        <h1 className="mt-5 max-w-[20ch] font-display text-[length:var(--text-display)] leading-[1.04] font-extrabold tracking-[-0.025em]">
          {title}
        </h1>
        <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-muted">{lead}</p>
        {children}
      </div>
    </Container>
  );
}

/**
 * Three columns split by vertical hairlines, each opening on a blue mono
 * label. The prototypes' recurring body block. Collapses to a stack under md,
 * where the dividers would be horizontal rules pretending to be columns.
 */
export function Cols({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-8 md:grid-cols-3 md:gap-0">{children}</div>;
}

export function Col({
  label,
  title,
  index = 0,
  children,
}: {
  label: string;
  title: string;
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <div className={`md:px-8 ${index > 0 ? 'md:border-s md:border-line' : 'md:ps-0'}`}>
      <p className="label text-accent">{label}</p>
      <h3 className="mt-3 font-display text-[1.25rem] leading-[1.3] font-bold tracking-[-0.01em]">
        {title}
      </h3>
      <div className="mt-3 text-muted">{children}</div>
    </div>
  );
}

/** A section band. `tint` puts it on --color-surface, which is how the
 *  prototypes alternate one section against the next. */
export function Band({
  tint = false,
  children,
  className = '',
}: {
  tint?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${tint ? 'bg-surface' : ''} py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Headings
   -------------------------------------------------------------------------- */
export function Display({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <Tag
      className={`font-display text-[length:var(--text-display)] leading-[1.04] font-extrabold tracking-[-0.025em] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Heading({
  children,
  className = '',
  as: Tag = 'h3',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <Tag
      className={`font-display text-[1.625rem] leading-[1.15] font-bold tracking-[-0.01em] ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Every heading is followed by a lead before any body copy. */
export function Lead({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`max-w-[var(--measure)] text-[1.25rem] leading-[1.5] text-muted ${className}`}>
      {children}
    </p>
  );
}

/* --------------------------------------------------------------------------
   Buttons and links

   A buy button is a link element on every instance, always. Copy says what
   happens: never "Learn more" alone, never "Click here".
   -------------------------------------------------------------------------- */
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'ink' | 'accent' | 'outline';
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = 'ink',
  external = false,
  className = '',
}: ButtonProps) {
  const classes = `btn btn-${variant} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
        <ArrowUpRight size={16} aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href as Route} className={classes}>
      {children}
    </Link>
  );
}

/** A disabled-looking action is a lie. When the destination does not exist
 *  yet, say so in words instead of rendering a dead button. */
export function PendingAction({ children }: { children: React.ReactNode }) {
  return <span className="label pending">{children}</span>;
}

export function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-1 underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ArrowUpRight size={14} aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/**
 * An internal link that carries the corner arrow.
 *
 * It exists so the arrow is a property of the component rather than something
 * each call site remembers to type. The docs rail shipped without one because
 * it was hand-rolled next to two other places that hand-rolled it correctly,
 * and nothing could have caught that. Every "go to" link in a rail, sidebar or
 * footer column uses this.
 */
export function ArrowLink({
  href,
  children,
  size = 13,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <Link
      href={href as Route}
      className={`inline-flex items-center gap-1 underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ArrowUpRight size={size} aria-hidden />
    </Link>
  );
}

/* --------------------------------------------------------------------------
   Unknown values

   Brief section 12: render a visible placeholder, never a guess. These read as
   deliberately blank rather than broken, which is the difference between an
   honest gap and a bug.
   -------------------------------------------------------------------------- */
export function Fact({
  value,
  format,
  fallback = 'not announced',
}: {
  value: Maybe<string | number>;
  format?: (v: string | number) => string;
  fallback?: string;
}) {
  if (isPending(value)) {
    return <span className="label text-muted">{fallback}</span>;
  }
  return <span className="tabular">{format ? format(value) : value}</span>;
}

export function Price({ value, currency }: { value: Maybe<number>; currency: string }) {
  if (isPending(value)) {
    return <span className="tabular text-muted">$--</span>;
  }
  return (
    <span className="tabular">
      ${value} {currency}
    </span>
  );
}

/* --------------------------------------------------------------------------
   Reserved image slots

   No product screenshots exist yet, so every image box is a dimensioned
   placeholder that reserves its own aspect ratio. The page has to look
   finished with all of them empty.
   -------------------------------------------------------------------------- */
export function ImageSlot({
  caption,
  ratio = '16 / 10',
  className = '',
  image,
  sizes = '100vw',
}: {
  caption: string;
  ratio?: string;
  className?: string;
  /** The real capture, once one exists. Replaces the hatch and the label. */
  image?: { src: string; alt: string };
  sizes?: string;
}) {
  if (image) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    );
  }
  return (
    <div className={`slot ${className}`} style={{ aspectRatio: ratio }}>
      {/* min-w-0 so a long caption wraps inside a narrow slot such as the
          phone frame, instead of running out past its own border. */}
      <span className="label relative z-10 min-w-0 break-words">{caption}</span>
    </div>
  );
}

/** Wraps a desktop screenshot and shows the real demo URL. */
export function BrowserFrame({
  url,
  caption,
  className = '',
  image,
  sizes = '100vw',
}: {
  url?: string;
  caption: string;
  className?: string;
  /** The real capture, once one exists. Replaces the hatch and the label. */
  image?: { src: string; alt: string };
  sizes?: string;
}) {
  return (
    <figure className={`border border-line-strong bg-surface ${className}`}>
      <div className="flex items-center gap-2 border-b border-line-strong px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="block h-2 w-2 rounded-full border border-line-strong" />
          <span className="block h-2 w-2 rounded-full border border-line-strong" />
          <span className="block h-2 w-2 rounded-full border border-line-strong" />
        </span>
        <span className="label truncate">{url ?? 'demo url not announced'}</span>
      </div>
      <ImageSlot
        caption={caption}
        ratio="16 / 10"
        className="border-0 border-t"
        image={image}
        sizes={sizes}
      />
    </figure>
  );
}

/** Wraps a 9:19.5 mobile screenshot. */
export function PhoneFrame({
  caption,
  className = '',
}: {
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`border border-line-strong bg-surface p-2 ${className}`}>
      <ImageSlot caption={caption} ratio="9 / 19.5" />
    </figure>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="label rounded-[var(--radius)] border border-line px-2 py-1">{children}</span>
  );
}
