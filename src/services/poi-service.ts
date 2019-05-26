import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Point, Category, User, RawPoint, Location } from "./poi-types";
import { HttpClient} from "aurelia-http-client";
import {MapUpdate} from "./messages";

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
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }

  async  getCurrentUser() {
    const response = await this.httpClient.get('/api/users/current');
    const currentUser = await response.content;
    console.log('Current user: ' + JSON.stringify(currentUser));
    return currentUser;
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
    const response = await this.httpClient.post('/api/users/authenticate', {
      email: email,
      password: password
    });
    const status = await response.content;
    if (status.success) {
      this.httpClient.configure(configuration => {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
      localStorage.poi = JSON.stringify(response.content);
      await this.getUsers();
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
    localStorage.poi = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization','');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.poi !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.poi);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
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
        geo: rawPoint.geo,
        _id: rawPoint._id
      };
      this.points.push(point);
    });
    console.log('Points:');
    console.log(this.points);
  }

  async getPoint(id) {
    const response = await this.httpClient.get(`/api/points/${id}`);
    const point = await response.content;
    console.log(JSON.stringify(point));
    return point;
  }

  async addPoint(name: string, description: string, category: Category, location: Location) {
    const currentUser = await this.getCurrentUser();
    const point = {
      name: name,
      description: description,
      addedBy: currentUser,
      geo: location
    };
    const response = await this.httpClient.post(`/api/categories/${category._id}/points`, point);
    const newPoint = await response.content;
    newPoint.geo = point.geo;
    this.points.push(newPoint);
    category.points.push(newPoint);
    this.ea.publish(new MapUpdate(newPoint));
    console.log('Point added: ' + JSON.stringify(point));
    //await this.resetData();
    //console.log('Category points: ' + category.points);
  }

  async updatePoint(id: string, name: string, description: string, location: Location) {
    const currentUser = await this.getCurrentUser();
    const point = {
      name: name,
      description: description,
      addedBy: currentUser,
      geo: location
    };
    const response = await this.httpClient.put(`/api/points/${id}`, point);
    console.log('Point updated: ' + response.content);
    await this.router.navigateToRoute('poiDetail', {id: id});
  }

  async deletePoint(id) {
    const response = await this.httpClient.delete(`/api/points/${id}`);
    await this.resetData();
    await this.router.navigateToRoute("POI");
  }

  async getCategories() {
    const response = await this.httpClient.get('/api/categories');
    const categories: Category[] = await response.content;
    console.log('Returned Categories:');
    console.log(categories);

    this.categories = categories;
    /*categories.forEach(rawCategory => {
      //let pointsArray: any[] =[];
      //rawCategory.points.forEach(pointString => {
        //console.log('Point Id: ' + pointString);
        let p : Point = this.points.find(point => pointString == point._id);
        //console.log('Point Object: ' + p);
        pointsArray.push(p);
      });//
      const category = {
        name: rawCategory.name,
        points: rawCategory.points,
        _id: rawCategory._id
      };
      this.categories.push(category);
    });*/
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
    //console.log('Added category: ' + category.name);
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

  async resetData() {
    this.points.length = 0;
    this.categories.length = 0;
    await this.getPoints();
    await this.getCategories();
  }
}
