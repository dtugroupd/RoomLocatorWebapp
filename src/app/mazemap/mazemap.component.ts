import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetLibrarySections, SetActiveSection } from './../actions/mazemap.action';
import { LibrarySection } from './../models/mazemap.model';
import { SurveyComponent } from './../survey/survey.component';
import { DynamicComponentService } from './../services/DynamicComponentService';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
  popup = null;
  defaultColor = 'rgba(220, 150, 120, 0.075)';
  hoverColor = 'rgba(220, 150, 120, 0.25)';
  activeColor = 'rgba(220, 150, 120, 0.75)';
  librarySections = [];
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
       zLevel: 1,
       bearing: -72.8,
       interactive: false,
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
        this.popup.remove();
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
      this.map.addLayer(layer);

      this.map.layerEventHandler.on('click', layer.id, (e: any, features: any) => {
        const id = features[0].properties.id;
        const section = this.librarySections.find(x => x.id === id);

        const popupContent = this.dynamicComponentService.injectComponent(
          SurveyComponent,
          x => {
            x.model = section.survey;
            x.sectionId = section.id;
          });
        this.popup = new Mazemap.Popup({ closeOnClick: true, offset: [0, -6] })
        .setLngLat(e.lngLat)
        .setDOMContent(popupContent)
        .addTo(this.map);

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
        this.activeLayer = null;
        return;
      }

      return;
    }

    if (layer.id === this.activeLayer) {
      return;
    }

    if (this.activeLayer) {
      this.map.setPaintProperty(this.activeLayer, 'fill-color', this.defaultColor);
    }

    if (layer.id) {
      this.map.setPaintProperty(layer.id, 'fill-color', this.activeColor);
    }

    this.store.dispatch(new SetActiveSection(this.librarySections.find(x => `${x.id}` === layer.id)));
    this.activeLayer = layer.id;
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
}
