import { Location } from "@/types/Location";

/**
 * A Google Maps link for a location's address. It needs no API key: Google Maps opens a search for the address
 */
export function mapsUrl(location: Pick<Location, "address" | "city" | "state" | "zip">): string {
  const address = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
