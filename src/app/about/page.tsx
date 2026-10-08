import Link from "next/dist/client/link";
import Navbar from "../../components/Navbar";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

const COFFEE_HOUSE_NAME = "SLO Drip";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Our story: from our first coffee house in 2010 to our commitment to the finest quality, every cup, every time.",
};

export default function AboutPage() {
  return (
    <Container className="pb-16">
      <Navbar></Navbar>
      <PageHeader
        title="Crafted with purpose. Served with passion."
        subtitle="Every great cup of coffee begins with a simple belief: quality matters."
      />

      <section aria-labelledby="our-story" className="mt-6 max-w-3xl space-y-4 text-lg leading-8">
        <h2 id="our-story" className="text-2xl font-semibold">
          Our story
        </h2>
        <p>
          We started with a passion for coffee and a desire to create something different: a place where exceptional
          coffee, genuine hospitality, and attention to detail come together. From the beginning, we set out to serve
          coffee we would be proud to share with our own family and friends.
        </p>
        <p>
          Great coffee is never an accident. It starts with carefully selected beans, continues through roasting and
          preparation, and ends with a cup that brings out the character and flavor of the coffee at its best. We choose
          quality over shortcuts and take the time to get every detail right.We have grown, but one thing has never
          changed: our commitment to the finest coffee and the experience that comes with it.
        </p>
        <p>
          We opened our first location in 2010 with a simple dream: a coffee house where every guest could enjoy truly
          exceptional coffee in a welcoming place. Thanks to our customers and community, we opened a second location in
          2019 to share the same passion with even more people. We have grown, but our commitment to the finest coffee
          has never changed.
        </p>
      </section>

      <section aria-labelledby="more-than-coffee" className="mt-12 max-w-3xl space-y-4 text-lg leading-8">
        <h2 id="more-than-coffee" className="text-2xl font-semibold">
          More than a beverage
        </h2>
        <p>
          For us, coffee is the beginning of a conversation, a moment to slow down, a gathering place for friends, and
          sometimes simply a little bright spot in a busy day.
        </p>
      </section>

      <section aria-labelledby="our-promise" className="mt-12 rounded-xl bg-brand-950 px-8 py-12 text-white">
        <p>From our first cup to our newest location, we remain guided by the same promise:</p>
        <h2 id="our-promise" className="mt-4 text-3xl font-semibold text-white">
          The finest quality. Every cup. Every time.
        </h2>
      </section>

      <footer className="mt-12">
        <p className="text-2xl font-semibold">Welcome to {COFFEE_HOUSE_NAME}.</p>
        <p className="mt-2 text-lg">We are glad you are here.</p>
        <div className="mt-6">
          <Button href="/menu">View our menu</Button>
        </div>
      </footer>
    </Container>
  );
}
