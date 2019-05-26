import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'poi'],
        name: 'POI',
        moduleId: PLATFORM.moduleName('views/points'),
        nav: true,
        title: 'POI'
      },
      {
        route: 'poi/:id',
        name: 'poiDetail',
        moduleId: PLATFORM.moduleName('views/poidetail'),
        title: 'POI'
      },
      {
        route: 'categories',
        name: 'categories',
        moduleId: PLATFORM.moduleName('views/categories'),
        nav: true,
        title: 'Categories'
      },
      {
        route: 'map',
        name: 'map',
        moduleId: PLATFORM.moduleName('views/map'),
        nav: true,
        title: 'Map'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      },
    ]);
    this.router = router;
  }
}
