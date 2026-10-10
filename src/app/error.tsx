"use client";

import { startTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

/**
 * Shown instead of a page that crashed while loading, for example when the database is down.
 * Next.js renders this automatically for any page under src/app; the footer from the layout stays visible
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  // Keep the real error in the browser console for debugging; the visitor only sees the friendly message
  useEffect(() => {
    console.error(error);
  }, [error]);

  // refresh() asks the server for the page again (the data may be back now), then reset() re-renders it
  function tryAgain() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <main>
      <Navbar />
      <Container className="pb-16">
        <PageHeader title="Something went wrong" subtitle="We couldn't load this page right now." />
        <Card className="flex flex-col items-start gap-4">
          <p className="text-brand-800">
            This usually means our server or database is having a moment. Your connection is probably fine. Wait a few
            seconds and try again.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={tryAgain}>Try again</Button>
            <Link href="/" className="font-medium">
              Go to the home page
            </Link>
          </div>
        </Card>
      </Container>
    </main>
  );
}
