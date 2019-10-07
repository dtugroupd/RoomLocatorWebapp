import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-polygon';
import { insidePolygon } from 'geolocation-utils';
import { librarySections, librarySectionLayers } from './librarySections';
// import * as d3 from 'd3-geo';

declare let Mazemap: any;

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.scss']
})

export class MazemapComponent implements OnInit {

  map: any;
  mapOptions: object;

  constructor() {
  }

  ngOnInit() {

    // Vertical view of the library
    // this.mapOptions = {
    //   container: 'map',
    //   campuses: 89,
    //   center: { lng: 12.5233, lat: 55.78685 },
    //   zoom: 19.25,
    //   zLevel: 1,
    //   bearing: -72.8
    // };

    // Horizontal view of the library
    this.mapOptions = {
      container: 'map',
      campuses: 89,
      center: { lng: 12.5233, lat: 55.78689 },
      zoom: 20.1,
      zLevel: 1,
      bearing: 17.3
    };

    // Create map instance with these options
    this.map = new Mazemap.Map(this.mapOptions);

    this.map.on('load', () => {
      this.map.highlighter = new Mazemap.Highlighter( this.map, {
        showOutline: true, // optional
        showFill: true, // optional
        outlineColor: Mazemap.Util.Colors.MazeColors.MazeOrange, // optional
        fillColor: Mazemap.Util.Colors.MazeColors.MazeOrange  // optional
  });

  
  console.log(this.map);
  console.log("Layers: " + (librarySectionLayers.length))
      for (const layer of librarySectionLayers) {
        console.log(layer);
        this.map.addLayer(layer);
      }
      // this.map.highlighter.highlight(this.librarySections);

      this.map.layerEventHandler.on('click', 'bottom2nd', (e, features) => {
        console.log(e);
        console.log(features);
      });
  });

  this.map.on('click', e => {
      const lngLat = e.lngLat;
      const zLevel = this.map.zLevel;

      const poi = librarySections.find(s => {
        return insidePolygon(lngLat, s.geometry.coordinates);
      });

      if (poi) {
        if (zLevel === poi.properties.zLevel) {
          this.map.highlighter.highlight(this.toMazemapPolygon(poi));
          console.log(true);
        } else {
          console.log(false);
        }
        } else {
          console.log(false);
        }
    });
  }

  toMazemapPolygon(polygon) {
    console.log(polygon);
    const newPolygon = Object.assign({}, JSON.parse(JSON.stringify(polygon)));
    newPolygon.geometry.coordinates = [newPolygon.geometry.coordinates.map(e =>
      [ e.lng, e.lat ]
    )];

    return newPolygon;
  }
}
