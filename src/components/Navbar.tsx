import Link from "next/link";
import Container from "@/components/ui/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Menu" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-brand-100 bg-white">
      <Container className="flex flex-wrap gap-x-6 gap-y-2 py-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="font-medium">
            {link.label}
          </Link>
        ))}
      </Container>
    </nav>
  );
}
