import { inject } from 'aurelia-framework';
import { Point, Category, User } from "./poi-types";
import { HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class PoiService {

  points: Point[] = [];
  categories: Category[] = [];
  users: Map<string, User> = new Map();

  constructor(private httpClient: HttpClient) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getUsers();
    this.getPoints();
    console.log('PoiService con: ' + this.points);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users.json');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  async getPoints() {
    const response = await this.httpClient.get('/api/points.json');
    this.points = await response.content;
    console.log(this.points);
  }

  async addPoint(name: string, description: string, category: Category) {
    const point = {
      name: name,
      description: description
    };
    this.points.push(point);
    category.points.push(point);
    console.log('Point added: ' + point);
    console.log('Category points: ' + category.points);
  }

  async addCategory(name: string,) {
    const category = {
      name: name,
      points: []
    };
    this.categories.push(category);
    console.log('Added category: ' + category.name);
  }
}
