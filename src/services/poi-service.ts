import { inject } from 'aurelia-framework';
import { Point, Category } from "./poi-types";
import { HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class PoiService {

  points: Point[] = [];
  categories: Category[] = [];

  constructor(private httpClient: HttpClient) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getPoints();
    console.log('PoiService con: ' + this.points);
  }

  async getPoints() {
    const response = await this.httpClient.get('/api/points.json');
    this.points = await response.content;
    console.log(this.points);
  }

  async getCategoriesPoints() {

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
}
