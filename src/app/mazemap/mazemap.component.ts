import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetLibrarySections } from './../actions/mazemap.action';
import { LibrarySection, Question } from './../models/mazemap.model';
import { MazemapState } from './../states/mazemap.state';
import { Observable } from 'rxjs';

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
  defaultColor = 'rgba(220, 150, 120, 0.075)';
  hoverColor = 'rgba(220, 150, 120, 0.75)';
  librarySections = [];
  librarySectionLayers = [];

  @Select(MazemapState.getLibrarySections) librarySections$: Observable<LibrarySection[]>;
  constructor(private store: Store ) { }

  ngOnInit() {

    // Get library sections from store and convert to layers
    this.store.dispatch(GetLibrarySections).subscribe(x => {
      this.librarySections = x.MazeMap.librarySections;
      this.convertLibrarySectionsToLayers(this.librarySections);
    });

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

    this.map.on('load', () => {
      this.map.highlighter = new Mazemap.Highlighter(this.map, {
        showOutline: true,
        showFill: true,
        outlineColor: Mazemap.Util.Colors.MazeColors.MazeOrange,
        fillColor: Mazemap.Util.Colors.MazeColors.MazeOrange,
      });

      this.map.on('zlevel', () => {
        this.updateLayers();
      });

      this.initLayers();
    });

    this.map.on('click', (e: any) => {
      console.log(e.lngLat);
    });
  }

  // Runs every time map changes zLevel
  updateLayers() {
    const zLevel = this.map.getZLevel();

    // Hide all currently visible layers
    this.librarySectionLayers.forEach(l => {
      if (this.map.getLayer(l.id)) {
        const visibility = this.map.getLayoutProperty(l.id, 'visibility');
        if (visibility === 'visible') {
          this.map.setLayoutProperty(l.id, 'visibility', 'none');
        }
      }
    });

    const zLevelLayers = this.librarySectionLayers.filter(l => {
      return l.zLevel === zLevel;
    });

    // Make all layers for current zLevel visible
    for (const layer of zLevelLayers) {
      const visibility = this.map.getLayoutProperty(layer.id, 'visibility');
      if (visibility === 'none') {
        this.map.setLayoutProperty(layer.id, 'visibility', 'visible');
      }
    }
  }


  // Add all layers and eventhandlers once
  initLayers() {
    this.librarySectionLayers.forEach(layer => {
      this.map.addLayer(layer);

      this.map.layerEventHandler.on('click', layer.id, (e: any, features: any) => {
        const id = features[0].properties.id;
        const section = this.librarySections.find(x => x.id === id);
        const questions = section.survey.questions.map((x: Question) => {
          return `<li>${x.text}</li>`;
        }).join('');

        new Mazemap.Popup({ closeOnClick: true, offset: [0, -6] })
        .setLngLat(e.lngLat)
        .setHTML(
        `
        <strong>Clicked on layer id ${id}</strong>
        <br/>
        Survey id ${section.survey.id}:
        <br/>
        <ul>
          ${questions}
        </ul>
        `)
        .addTo(this.map);
      });

      this.map.layerEventHandler.on('mousemove', layer.id, () => {
        this.setHoverState(layer.id);
      });
    });

    this.map.layerEventHandler.on('mousemove', null, () => {
      this.setHoverState(null);
    });

    this.updateLayers();
  }

  // Change layer style properties. Runs on layer 'mouseover' event.
  setHoverState(layerId: number) {
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

  // Convert sections from backend to layers readable by MazeMap
  convertLibrarySectionsToLayers(ls: Array<LibrarySection>) {
    ls.forEach(x => {
      const coordinates = x.coordinates.map(c => {
        return [c.longitude, c.latitude];
      });

      const lsLayer = {
        id: `layer_${x.id}`,
        type: 'fill',
        zLevel: x.zLevel,
        source: {
          type: 'geojson',
          data: {
              type: 'Feature',
              properties: {
                  name: `${x.id}`,
                  zLevel: x.zLevel,
                  id: x.id
              },
              geometry: {
                  type: 'Polygon',
                  coordinates: [ coordinates ]
              },
          },
        },
        layout: {
            visibility: 'visible'
        },
        paint:
        {
            'fill-color': 'rgba(220, 150, 120, 0.075)',
        }
      };

      this.librarySectionLayers.push(lsLayer);
    });
  }
}
