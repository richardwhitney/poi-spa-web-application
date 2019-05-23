import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Point, Category, User, RawCategory, RawPoint } from "./poi-types";
import { HttpClient} from "aurelia-http-client";

@inject(HttpClient,EventAggregator, Aurelia, Router)
export class PoiService {

  points: Point[] = [];
  categories: Category[] = [];
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getUsers();
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    await this.getPoints();
    await this.getCategories();
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      await this.getPoints();
      await this.getCategories();
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
    const response = await this.httpClient.get('/api/points');
    const rawPoints : RawPoint[] = await response.content;
    rawPoints.forEach(rawPoint => {
      const point = {
        name: rawPoint.name,
        description: rawPoint.description,
        imageURL: rawPoint.imageUrl,
        addedBy: this.usersById.get(rawPoint.addedBy),
        _id: rawPoint._id
      };
      this.points.push(point);
    });
    console.log('Points:');
    console.log(this.points);
  }

  async addPoint(name: string, description: string, category: Category) {
    const point = {
      name: name,
      description: description
    };
    //this.points.push(point);
    //category.points.push(point);
    console.log('Point added: ' + point);
    console.log('Category points: ' + category.points);
  }

  async getCategories() {
    const response = await this.httpClient.get('/api/categories');
    const rawCategories: RawCategory[] = await response.content;
    console.log('***Points***: ' + this.points);

    rawCategories.forEach(rawCategory => {
      let pointsArray: any[] =[];
      rawCategory.points.forEach(pointString => {
        console.log('Point Id: ' + pointString);
        let p : Point = this.points.find(point => pointString == point._id);
        console.log('Point Object: ' + p);
        pointsArray.push(p);
      });
      const category = {
        name: rawCategory.name,
        points: pointsArray,
        _id: rawCategory._id
      }
      this.categories.push(category);
    });
    console.log('Categories:');
    console.log(this.categories);
  }

  async addCategory(name: string,) {
    const category = {
      name: name,
    };
    const response = await this.httpClient.post('/api/categories', category);
    const newCategory = await response.content;
    this.categories.push(newCategory);
    console.log('Added category: ' + category.name);
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
