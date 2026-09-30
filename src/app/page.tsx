import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Home</h1>
      <Image src="/images/coffee.jpg" alt="Coffee Image" width={875} height={400}></Image>
      <p>Welcome to (Name of Coffee Shop)! </p>
      <Link href="/menu">Visit Menu</Link>
    </main>
  );
}
