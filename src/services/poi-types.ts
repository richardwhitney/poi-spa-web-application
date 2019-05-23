export interface RawCategory {
  name: string;
  points: string[];
  _id: string;
}

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
  _id: string;

}
export interface Point {
  name: string;
  description: string;
  imageUrl?: string;
  addedBy: User;
  _id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}
