import Link from "next/link";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

/**
 * Shown for any URL that doesn't match a page, and whenever a page calls notFound()
 * (for example /admin/menu/<id> with an id that doesn't exist)
 */
export default function NotFound() {
  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Page not found" subtitle="We couldn't find the page you were looking for." />
        <Card className="flex flex-col items-start gap-4">
          <p className="text-brand-800">The link may be old, or the address may have a typo.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/menu">See the menu</Button>
            <Link href="/" className="font-medium">
              Go to the home page
            </Link>
          </div>
        </Card>
      </Container>
    </main>
  );
}
