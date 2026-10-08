import Link from "next/link";
import Container from "@/components/ui/Container";
import { SITE_NAME } from "@/constants/site";
import { LOCATIONS } from "@/data/mockLocations";
import { mapsUrl } from "@/lib/mapsUrl";

// Site footer shown on every page: the shop name, both stores (address links to Google Maps, phone, hours) and the Admin link
export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading text-xl font-semibold text-brand-950">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-brand-800">Crafted with purpose. Served with passion.</p>
          </div>
          {LOCATIONS.map((location) => (
            <div key={location._id}>
              <p className="font-semibold">
                <a
                  href={mapsUrl(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-950 hover:text-brand-600 hover:underline"
                >
                  {location.address}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </p>
              <p className="text-sm text-brand-800">
                {location.city}, {location.state} {location.zip}
              </p>
              <p className="mt-2 text-sm text-brand-800">
                <a href={`tel:${location.phone}`}>{location.phone}</a>
              </p>
              <p className="text-sm text-brand-800">{location.hours}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-brand-100 pt-6 text-xs text-brand-700 sm:flex-row sm:justify-between">
          <p>&copy; 2026 {SITE_NAME}. A fictional demo project, not affiliated with any other business.</p>
          {/* Points to /admin/menu until the admin home page (/admin) exists */}
          <Link href="/admin/menu">Admin</Link>
        </div>
      </Container>
    </footer>
  );
}
