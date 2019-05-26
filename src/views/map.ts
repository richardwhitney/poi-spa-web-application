import { LeafletMap } from "../services/leaflet-map";
import { PoiService } from "../services/poi-service";
import { inject } from 'aurelia-framework';

@inject(PoiService)
export class Map {
  mapId = 'main-map';
  mapHeight = 600;
  map: LeafletMap;

  constructor(private ps: PoiService) {

  }

  renderPoints() {
    for (let point of this.ps.points) {
      const pointStr =  `${point.name}`;
      this.map.addMarker(point.geo, pointStr, 'Points');
    }
  }

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203 },
      zoom: 8,
      minZoom: 1
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.showZoomControl();
    this.map.addLayerGroup('Points');
    this.map.showLayerControl();
    this.renderPoints();
  }

}
