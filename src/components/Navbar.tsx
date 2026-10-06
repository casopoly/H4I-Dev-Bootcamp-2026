import Link from "next/link";
import Container from "@/components/ui/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Menu" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact Us" },
  { href: "/admin/menu", label: "Admin" },
];

// Same look on every page: centered links on a soft translucent white bar.
// Always stays at the top while scrolling.
// overlay: float over a hero image at the top of the page. Otherwise it takes up its own space above the content.
export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  return (
    <nav className={`z-20 bg-white/60 backdrop-blur-sm ${overlay ? "fixed inset-x-0 top-0" : "sticky top-0"}`}>
      <Container className="flex flex-wrap justify-center gap-x-6 gap-y-2 py-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-lg font-semibold text-brand-950 hover:text-brand-600">
            {link.label}
          </Link>
        ))}
      </Container>
    </nav>
  );
}
