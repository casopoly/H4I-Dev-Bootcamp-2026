export interface Location {
  _id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string; //example: operating hours, e.g., "9 am-4 pm"
  image: string; //example: "/images/location/(put photo file)"
}
