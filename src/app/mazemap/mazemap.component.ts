import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-polygon';
import { insidePolygon } from 'geolocation-utils';
import { librarySections, librarySectionLayers, features } from './librarySections';
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
  lastHoveredLayer = null;
  defaultColor = 'rgba(220, 150, 120, 0.25)';
  hoverColor = 'rgba(220, 150, 120, 0.75)';

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
      bearing: 17.3,
    };

    // Create map instance with these options
    this.map = new Mazemap.Map(this.mapOptions);

    console.log(this.map);

    this.map.on('load', () => {
      this.map.highlighter = new Mazemap.Highlighter(this.map, {
        showOutline: true,
        showFill: true,
        outlineColor: Mazemap.Util.Colors.MazeColors.MazeOrange,
        fillColor: Mazemap.Util.Colors.MazeColors.MazeOrange,
      });

      // this.map.addLayer(librarySectionLayer);

      this.map.on('zlevel', () => {
        this.updateFeatures();
        console.log("Changed z level");
      });

      // const testToLngLat = [librarySections[0].geometry.coordinates.map(o => {
      //   return [o.lng, o.lat];
      // })];

      // console.log(testToLngLat);

      // const testFromLngLat = librarySectionLayers[0].source.data.geometry.coordinates[0].map(e => {
      //   return { lng: e[0], lat: e[1] };
      // });

      // console.log(testFromLngLat);

      this.initLayers();

      // this.map.highlighter.highlight(this.librarySections);

    });

    this.map.on('click', e => {
      const lngLat = e.lngLat;
      const zLevel = this.map.zLevel;
      console.log(e.lngLat);
      // var poi = librarySections.find(s => {
      //   return insidePolygon(lngLat, s.geometry.coordinates) && zLevel === poi.properties.zLevel;
      // });

      // if (poi) {
      //   this.map.highlighter.highlight(this.toMazemapPolygon(poi));
      //   console.log(true);
      // } else {
      //   console.log(false);
      // }
    });
  }

  updateFeatures() {
    const layerIds = librarySectionLayers.map(l => l.id);
    const zLevel = this.map.getZLevel();
    const zLevelLayers = librarySectionLayers.filter(l => {
      return l.id.includes(`B101_DI00${zLevel - 1}`);
    });

    for (const layer of layerIds) {
      this.map.getSource(layer).setData(null);
    }

    for (const layer of zLevelLayers) {
      console.log(layer);
      this.map.getSource(layer.id).setData(features.find(f => f.properties.name === layer.id));
    }

    // const polygons = features.filter(f => {
    //   return f.properties.zLevel === this.map.getZLevel();
    // });

    // const source = this.map.getSource('B101_DI000_02');
    // console.log(this.map.getSource('B101_DI000_02'));

    // source.setData({ type: 'FeatureCollection', features: polygons });
  }

  initLayers() {
    for (const layer of librarySectionLayers) {
      this.map.addLayer(layer);

      this.map.layerEventHandler.on('click', layer.id, (e, features) => {
        console.log(e);
        console.log(features);
        console.log('You clicked ' + features[0].properties.name);
      });

      this.map.layerEventHandler.on('mousemove', layer.id, (e, features) => {
        this.setHoverState(layer.id);
      });

    }

    this.map.layerEventHandler.on('mousemove', null, (e, features) => {
      // mouseover on NO specific layer
      this.setHoverState(null);
    });

    this.updateFeatures();
  }

  toMazemapPolygon(polygon) {
    console.log(polygon);
    const newPolygon = Object.assign({}, JSON.parse(JSON.stringify(polygon)));
    newPolygon.geometry.coordinates = [newPolygon.geometry.coordinates.map(e =>
      [e.lng, e.lat]
    )];

    console.log(newPolygon);

    return newPolygon;
  }

  setHoverState(layerId) {
    if (layerId === this.lastHoveredLayer) {
      return;
    }
    if (this.lastHoveredLayer) {
      this.map.setPaintProperty(this.lastHoveredLayer, 'fill-color', this.defaultColor);
    }
    if (layerId) {
      this.map.setPaintProperty(layerId, 'fill-color', this.hoverColor);
    }

    this.lastHoveredLayer = layerId;
  }

}
