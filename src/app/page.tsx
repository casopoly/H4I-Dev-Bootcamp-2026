import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main >
      <Navbar />
      <h1>Home</h1>
      <p>Welcome to (Name of Coffee Shop)! </p>
      <Link href = "menu-page">Visit Menu</Link>
    </main>
  );
}
