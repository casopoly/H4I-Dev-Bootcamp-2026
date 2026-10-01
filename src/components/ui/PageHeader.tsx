// Standard page title block. Use at the top of every page for a consistent look.
export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="py-8">
      <h1>{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-brand-800">{subtitle}</p>}
    </header>
  );
}
