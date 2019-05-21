export interface Category {
  name: string;
  points: Point[];
}

export interface Point {
  name: string;
  description: string;
}

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
