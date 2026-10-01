// Shared card surface (white box with border and shadow). Put content inside it.
export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-brand-100 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}
