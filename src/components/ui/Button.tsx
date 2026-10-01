import Link from "next/link";

// Shared button. Pass `href` to render a link that looks like a button.
// variant="dark" stands out on light or photo backgrounds.
const base = "inline-block rounded-lg font-medium transition-colors";
const sizes = {
  md: "px-5 py-2.5",
  lg: "px-10 py-4 text-2xl",
};
const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 hover:text-white",
  dark: "bg-brand-950 text-white shadow-lg hover:bg-brand-900 hover:text-white",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, href, variant = "primary", size = "md", ...rest }: Props) {
  const styles = `${base} ${sizes[size]} ${variants[variant]}`;
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
