import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetLibrarySections, SetActiveSection } from './../actions/mazemap.action';
import { LibrarySection } from './../models/mazemap.model';
import { SurveyComponent } from './../survey/survey.component';
import { DynamicComponentService } from './../services/DynamicComponentService';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { MazemapState } from '../states/mazemap.state';
import { Observable } from 'rxjs';


declare let Mazemap: any;

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '50px',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0.0,
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ])
  ]
})

export class MazemapComponent implements OnInit {

  map: any;
  mapOptions: object;
  lastHoveredLayer = null;
  activeLayer = null;
  promptFeedback = false;
  activeLayerMarker = null;
  popup = null;
  defaultColor = 'rgba(220, 150, 120, 0.075)';
  hoverColor = 'rgba(220, 150, 120, 0.25)';
  activeColor = 'rgba(220, 150, 120, 0.75)';
  librarySections: LibrarySection[] = [];
  librarySectionLayers = [];

  @Select(MazemapState.getLibrarySections) librarySections$: Observable<LibrarySection[]>;

  constructor(private store: Store, private dynamicComponentService: DynamicComponentService ) { }

  ngOnInit() {

    // Get library sections from store and convert to layers
    this.store.dispatch(GetLibrarySections).subscribe(x => {
      this.librarySections = x.MazeMap.librarySections;
      this.convertLibrarySectionsToLayers(this.librarySections);
    });

    // Vertical view of the library
    this.mapOptions = {
       container: 'map',
       campuses: 89,
       center: { lng: 12.5233335, lat: 55.7868826 },
       zoom: 19.1,
       maxZoom: 19.5,
       minZoom: 18.5,
       zLevel: 1,
       bearing: -72.8,
     };

    // Horizontal view of the library
    // this.mapOptions = {
    //   container: 'map',
    //   campuses: 89,
    //   center: { lng: 12.5233, lat: 55.78689 },
    //   zoom: 20.1,
    //   zLevel: 1,
    //   bearing: 17.3,
    // };

    // Create map instance with these options
    this.map = new Mazemap.Map(this.mapOptions);

    this.map.on('load', () => {
      this.map.on('zlevel', () => {
        this.updateLayers();
        this.setActiveLayer(null);
        this.setLayerHoverState(null);
        this.closeFeedbackPrompt();
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
      const mapLayer = this.map.addLayer(layer);

      this.map.layerEventHandler.on('click', layer.id, (e: any, features: any) => {
        const id = features[0].properties.id;
        const section = this.librarySections.find(x => x.id === id);

        this.setActiveLayer(layer);
        this.openFeedbackPrompt();

      });

      this.map.layerEventHandler.on('mousemove', layer.id, () => {
        this.setLayerHoverState(layer.id);
      });


    });

    this.map.layerEventHandler.on('mousemove', null, () => {
      this.setLayerHoverState(null);
    });

    this.map.layerEventHandler.on('click', null, () => {
      this.setActiveLayer(null);
      this.closeFeedbackPrompt();
      this.store.dispatch(new SetActiveSection(null));
    });

    this.updateLayers();
  }

  // Change layer style properties. Runs on layer 'mouseover' event.
  setLayerHoverState(layerId: number) {
    if (layerId === this.lastHoveredLayer) {
      return;
    }

    if (this.lastHoveredLayer) {
      if (this.lastHoveredLayer !== this.activeLayer) {
        this.map.setPaintProperty(this.lastHoveredLayer, 'fill-color', this.defaultColor);
      }
    }

    if (layerId && this.activeLayer !== layerId) {
        this.map.setPaintProperty(layerId, 'fill-color', this.hoverColor);
      }

    this.lastHoveredLayer = layerId;
  }

  setActiveLayer(layer: any)  {
    if (!layer) {
      if (this.activeLayer) {
        this.map.setPaintProperty(this.activeLayer, 'fill-color', this.defaultColor);
        this.activeLayerMarker.remove();
        this.activeLayer = null;
        return;
      }

      return;
    }

    const featureCoordinates = this.toLatLng(layer.source.data.geometry.coordinates[0]);
    const center = this.getCenter(featureCoordinates);
    const section = this.librarySections.find(x => `${x.id}` === layer.id);

    if (layer.id === this.activeLayer) {
      return;
    }

    if (this.activeLayer) {
      this.map.setPaintProperty(this.activeLayer, 'fill-color', this.defaultColor);
      this.activeLayerMarker.remove();
    }

    if (layer.id) {
      this.map.setPaintProperty(layer.id, 'fill-color', this.activeColor);
    }

    this.store.dispatch(new SetActiveSection(this.librarySections.find(x => `${x.id}` === layer.id)));
    this.activeLayer = layer.id;

    const options = {
      color: 'MazeGreen',
      size: 50,
      imgUrl: this.getMarkerIconUrl(section),
      imgScale: 0.5,
      innerCircle: true,
      innerCircleColor: 'white',
      innerCircleScale: 0.7,
      // shape: 'circle',
      zLevel: layer.source.data.properties.zLevel
    };

    this.activeLayerMarker = new Mazemap.MazeMarker(options).setLngLat(center).addTo(this.map);
  }

  closeFeedbackPrompt() {
    this.promptFeedback = false;
  }

  openFeedbackPrompt() {
    this.promptFeedback = true;
  }

  // Convert sections from backend to layers readable by MazeMap
  convertLibrarySectionsToLayers(ls: Array<LibrarySection>) {
    ls.forEach(x => {
      const coordinates = x.coordinates.map(c => {
        return [c.longitude, c.latitude];
      });

      const lsLayer = {
        id: `${x.id}`,
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

  getCenter(coordinates) {
    const pts = coordinates;
    const off = pts[0];
    let twicearea = 0;
    let x = 0;
    let y = 0;
    const nPts = pts.length;
    let p1;
    let p2;
    let f;

    for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
      p1 = pts[i];
      p2 = pts[j];
      f = (p1.lat - off.lat) * (p2.lng - off.lng) - (p2.lat - off.lat) * (p1.lng - off.lng);
      twicearea += f;
      x += (p1.lat + p2.lat - 2 * off.lat) * f;
      y += (p1.lng + p2.lng - 2 * off.lng) * f;
    }

    f = twicearea * 3;

    return {
    lng: x / f + off.lat,
    lat: y / f + off.lng
    };
  }

  toLatLng(coordinates) {
    const latLng = coordinates.map(c => {
      return { lat: c[0], lng: c[1]};
    });

    return latLng;
  }

  getMarkerIconUrl(section: LibrarySection) {
    let iconUrl: string;

    switch (section.type) {
      case 0:
        iconUrl = 'assets/databar.svg';
        break;
      case 1:
        iconUrl = 'assets/study.svg';
        break;
      case 2:
        iconUrl = 'assets/group-study.svg';
        break;
      case 3:
        iconUrl = 'assets/lounge.svg';
        break;
      case 4:
        iconUrl = 'assets/stage.svg';
        break;
      case 5:
        iconUrl = 'assets/kitchen.svg';
        break;
      case 6:
        iconUrl = 'assets/information.svg';
        break;
      default:
        break;
    }

    return iconUrl;
  }
}




