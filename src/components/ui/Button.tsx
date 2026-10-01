import Link from "next/link";

// Shared button. Pass `href` to render a link that looks like a button.
const styles =
  "inline-block rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-700 hover:text-white";

type Props = { children: React.ReactNode; href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, href, ...rest }: Props) {
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
}
