import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/"> Home </Link>
      <Link href="/about"> About Us </Link>
      <Link href="/menu"> Menu </Link>
      <Link href="/jobs"> Jobs </Link>
      <Link href="/contact"> Contact Us </Link>
    </nav>
  );
}
