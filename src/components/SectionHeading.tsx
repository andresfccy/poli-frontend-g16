interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-coral">{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          tone === 'light' ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${tone === 'light' ? 'text-cream/80' : 'text-slate'}`}>
        {description}
      </p>
    </div>
  );
}
