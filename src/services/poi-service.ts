import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Point, Category, User } from "./poi-types";
import { HttpClient} from "aurelia-http-client";

@inject(HttpClient,EventAggregator, Aurelia, Router)
export class PoiService {

  points: Point[] = [];
  categories: Category[] = [];
  users: Map<string, User> = new Map();

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
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

  signup(firstName: string, lastName: string, email: string, password: string) {
    this.changeRouter(PLATFORM.moduleName('app'));
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'));
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

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
