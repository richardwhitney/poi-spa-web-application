
export interface Category {
  name: string;
  points: Point[];
  _id: string
}

export interface RawPoint {
  name: string;
  description: string;
  imageUrl?: string;
  addedBy: string;
  geo: Location;
  _id: string;

}
export interface Point {
  name: string;
  description: string;
  imageUrl?: string;
  addedBy: User;
  geo?: Location;
  _id: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}
