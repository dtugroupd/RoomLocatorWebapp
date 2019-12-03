/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section } from 'src/app/models/mazemap/section.model';
import { Store, Select } from '@ngxs/store';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MazemapState } from '../../_states/mazemap.state';
import { Observable } from 'rxjs';
import { MapLocation } from 'src/app/models/mazemap/map-location.model';
import {
  SetActiveSection, SetActivateFeedbackAndStatus,
  SetActiveLocation, ResetActiveLocation, GetLocations
} from '../../_actions/mazemap.actions';
import {
  toLatLng, getCenter, convertSectionsToLayers,
  markerOptions, convertLocationsToLayers,
} from './mazemap-helper';

declare let Mazemap: any;

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.scss'],
  animations: [
    trigger('showHideSurveyButton', [
      state(
        'show',
        style({
          height: '45px',
          opacity: 1
        })
      ),
      state(
        'hide',
        style({
          height: '0px',
          opacity: 0.0
        })
      ),
      transition('show => hide',
        [animate('0.15s ease-in-out')]
      ),
      transition('hide => show',
        [animate('0.15s ease-in-out')]
      )
    ]),
    trigger('showHideStatusMenu', [
      state(
        'show',
        style({
          height: '200px',
          opacity: 1
        })
      ),
      state(
        'hide',
        style({
          height: '0px',
          opacity: 0.0
        })
      ),
      transition('show => hide',
        [animate('0.15s ease-in-out')]
      ),
      transition('hide => show',
        [animate('0.15s ease-in-out')]
      )
    ]),
    trigger('activeLocation', [
      state(
        'show',
        style({
          height: '40px',
          opacity: 1
        })
      ),
      state(
        'hide',
        style({
          height: '0px',
          opacity: 0.0
        })
      ),
      transition('show => hide',
        [animate('0.15s ease-in-out')]
      ),
      transition('hide => show',
        [animate('0.15s ease-in-out')]
      )
    ])
  ]
})
export class MazemapComponent implements OnInit, OnDestroy {
  map: any;
  mapOptions: object;
  promptFeedback = false;
  showStatusMenu = false;
  activateFeedbackAndStatus = false;
  isLocationActive = false;
  toggledSections = true;
  toggledEvents = false;
  lastHoveredLayer = null;
  activeLocation: MapLocation = null;
  activeLayerId = null;
  activeLayerMarker = null;
  activeSection: Section = null;
  popup = null;
  defaultColor = 'rgba(220, 150, 120, 0.075)';
  hoverColor = 'rgba(220, 150, 120, 0.25)';
  activeColor = 'rgba(220, 150, 120, 0.75)';
  locations: MapLocation[] = [];
  sections: Section[] = [];
  sectionLayers = [];
  sectionLayerMarkers = [];
  eventMarkers = [];
  locationLayers = [];

  @Select(MazemapState.getActivateFeedbackAndStatus)
  activateFeedbackAndStatus$: Observable<boolean>;
  @Select(MazemapState.getLocations) locations$: Observable<MapLocation[]>;
  @Select(MazemapState.getActiveLocation) activeLocation$: Observable<
    MapLocation
  >;
  @Select(MazemapState.getActiveSection) activeSection$: Observable<Section>;

  constructor(private store: Store) {
    this.activateFeedbackAndStatus$.subscribe(x => {
      this.activateFeedbackAndStatus = x;
    });

    this.locations$.subscribe(x => {
      if (x) {
        this.locations = x;
        this.locationLayers = convertLocationsToLayers(this.locations);
      }
    });

    this.activeLocation$.subscribe(x => {
      this.activeLocation = x;

      if (this.map && this.activeLocation) {
        this.sectionLayers = convertSectionsToLayers(
          this.activeLocation.sections
          );
        this.isLocationActive = true;
        this.initLayers();
        this.toggleLocationLayers(false);
        this.map.flyTo({
          center: { lng: x.longitude, lat: x.latitude },
          zoom: x.zoom
        });
      } else {
      this.isLocationActive = false;
      }
    });

    this.activeSection$.subscribe(x => {
      if (x && x.survey) {
        this.openFeedbackPrompt();
      } else {
        this.closeFeedbackPrompt();
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetLocations());

    // Vertical view of the library
    this.mapOptions = {
      container: 'map',
      campuses: 89,
      center: { lng: 12.52082545886367, lat: 55.78604408577766 },
      zoom: 15.65,
      zLevel: null,
      bearing: -72.8,
      autoSetRTLTextPlugin: false
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
      this.map.loadImage('../assets/mapIcons/skylab.png', (error, image) => {
        if (error) {
          throw error;
        }
        this.map.addImage('rocket', image);
      });

      this.map.loadImage('../assets/mapIcons/books.png', (error, image) => {
        if (error) {
          throw error;
        }
        this.map.addImage('library', image);
      });

      this.map.on('zlevel', () => {
        if (this.sectionLayers.length > 0) {
          this.updateLayers();
          this.setActiveLayer(null);
          this.setLayerHoverState(null);
        }
        this.closeFeedbackPrompt();
      });
      this.map.on('zoom', () => {
        this.map.getZoom();
      });
      this.map.on('zoomend', () => {
        if (this.map.getZoom() < 18 && !this.activeLocation) {
          this.toggleLocationLayers(true);
        } else if (this.map.getZoom() > 18 && this.activeLocation) {
          this.toggleLocationLayers(false);
        } else if (this.map.getZoom() < 17.5 && this.activeLocation) {
          this.toggleLocationLayers(true);
          this.removeSectionLayers();
          this.store.dispatch(new ResetActiveLocation());
        }
      });

      this.initLocationLayers();
    });

    this.map.on('click', (e: any) => {
      // console.log(e.lngLat);
      // console.log(this.map.getZoom());
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new SetActivateFeedbackAndStatus(false));
    this.store.dispatch(new SetActiveSection(null));
    this.store.dispatch(new SetActiveLocation(null));
    this.removeSectionLayers();
    this.map.remove();
  }

  toggleStatusMenu() {
    this.showStatusMenu = !this.showStatusMenu;
  }

  initLocationLayers() {
    if (this.locationLayers) {
      this.locationLayers.forEach(l => {
        this.map.addLayer(l);
        this.map.layerEventHandler.on('click', l.id, () => {
          this.store.dispatch(new SetActiveLocation(l.id));
        });
      });
    }
  }

  toggleLocationLayers(display: boolean) {
    this.locationLayers.forEach(l => {
      if (this.map.getLayer(l.id)) {
        const visibility = this.map.getLayoutProperty(l.id, 'visibility');
        if (visibility === 'visible' && display === false) {
          this.map.setLayoutProperty(l.id, 'visibility', 'none');
        }
        if (visibility === 'none' && display === true) {
          this.map.setLayoutProperty(l.id, 'visibility', 'visible');
        }
      }
    });
  }
  // Runs every time map changes zLevel
  updateLayers() {
    const zLevel = this.map.getZLevel();


    if (this.toggledSections) {
      // Hide all currently visible layers
      this.sectionLayers.forEach(l => {
        if (this.map.getLayer(l.id)) {
          const visibility = this.map.getLayoutProperty(l.id, 'visibility');
          if (visibility === 'visible') {
            this.map.setLayoutProperty(l.id, 'visibility', 'none');
          }
        }
      });

      const zLevelLayers = this.sectionLayers.filter(l => {
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
  }

  // Add all layers and eventhandlers once
  initLayers() {
    if (this.sectionLayers) {
      this.sectionLayers.forEach(layer => {
        if (!this.map.getLayer(layer.id)) {
          this.map.addLayer(layer);
          this.map.layerEventHandler.on(
            'click',
            layer.id,
            (e: any, features: any) => {
              this.setActiveLayer(layer);
            }
          );
          this.map.layerEventHandler.on('mousemove', layer.id, () => {
            if (this.map.getLayer(layer.id)) {
              this.setLayerHoverState(layer.id);
            }
          });
          this.initSectionMarker(layer);
        }
      });

      this.map.layerEventHandler.on('mousemove', null, () => {
        if (this.sectionLayers.length > 0) {
          this.setLayerHoverState(null);
        }
      });

      this.map.layerEventHandler.on('click', null, () => {
        this.setActiveLayer(null);
      });

      this.updateLayers();
    }
  }

  initSectionMarker(layer: any) {
    const featureCoordinates = toLatLng(
      layer.source.data.geometry.coordinates[0]
    );
    const center = getCenter(featureCoordinates);
    const marker = new Mazemap.MazeMarker(markerOptions(layer).default)
      .setLngLat(center)
      .addTo(this.map);
    marker.on('click', () => {
      this.setActiveLayer(layer);
    });

    this.sectionLayerMarkers.push(marker);
  }

  removeSectionLayers() {
    if (this.sectionLayers.length > 0) {
      let i = 1;
      this.sectionLayers.forEach(layer => {
        if (this.map.getLayer(layer.id)) {
          this.map.layerEventHandler.off('mousemove', layer.id);
          this.map.layerEventHandler.off('click', layer.id);
          this.map.on('mousemove', () => {});
          this.map.removeLayer(layer.id);
          if (this.map.getSource(layer.id)) {
            this.map.removeSource(layer.id);
          }
          i++;
        }
      });
      this.sectionLayers = [];
      this.activeLayerId = null;
      this.lastHoveredLayer = null;
      this.closeFeedbackPrompt();
      this.sectionLayerMarkers.forEach(x => {
        x.off('click');
        x.remove();
      });
    }
  }

  // Change layer style properties. Runs on layer 'mouseover' event.
  setLayerHoverState(layerId: number) {
    if (this.sectionLayers.length > 0) {
      if (layerId === this.lastHoveredLayer) {
        return;
      }

      if (this.lastHoveredLayer) {
        if (this.lastHoveredLayer !== this.activeLayerId) {
          this.map.setPaintProperty(
            this.lastHoveredLayer,
            'fill-color',
            this.defaultColor
          );
        }
      }

      if (layerId && this.activeLayerId !== layerId) {
        this.map.setPaintProperty(layerId, 'fill-color', this.hoverColor);
      }

      this.lastHoveredLayer = layerId;
    }
  }

  setActiveLayer(layer: any) {
    if (!layer) {
      if (this.activeLayerId) {
        this.map.setPaintProperty(
          this.activeLayerId,
          'fill-color',
          this.defaultColor
        );
        this.activeLayerId = null;
        this.store.dispatch(new SetActiveSection(null));
        return;
      }

      return;
    }

    if (layer.id === this.activeLayerId) {
      return;
    }

    if (this.activeLayerId) {
      this.map.setPaintProperty(
        this.activeLayerId,
        'fill-color',
        this.defaultColor
      );
      this.store.dispatch(new SetActiveSection(null));
    }

    if (layer.id) {
      this.map.setPaintProperty(layer.id, 'fill-color', this.activeColor);
      this.store.dispatch(new SetActiveSection(layer.section));
      if (this.activeSection) {
        this.openFeedbackPrompt();
      }
    }

    this.activeLayerId = layer.id;
  }

  hideSectionLayers() {
      this.sectionLayers.forEach(l => {
        if (this.map.getLayer(l.id)) {
          this.map.setLayoutProperty(l.id, 'visibility', 'none');
        }
      });

      this.sectionLayerMarkers.forEach(x => {
        x.off('click');
        x.remove();
      });
  }

  showSectionLayers() {
     this.sectionLayers.forEach(l => {
       if (this.map.getLayer(l.id)) {
         this.map.setLayoutProperty(l.id, 'visibility', 'visible');
         this.initSectionMarker(l);
       }
     });
  }

  showEventMarkers() {
    this.activeLocation.events.forEach(e => {

    })
  }

  hideEventMarkers() {

  }
  toggleEventLayers() {
    this.toggledEvents = true;
    this.toggledSections = false;
    this.hideSectionLayers();
    this.showEventMarkers();
    this.updateLayers();
    this.setActiveLayer(null);
    this.closeFeedbackPrompt();
  }

  toggleSectionLayers() {
    this.toggledSections = true;
    this.toggledEvents = false;
    this.showSectionLayers();
    this.hideEventMarkers();
    this.updateLayers();
    if (this.activeSection) {
      this.openFeedbackPrompt();
    }
  }
  openFeedbackPrompt() {
    this.promptFeedback = true;
  }

  closeFeedbackPrompt() {
    this.promptFeedback = false;
  }
}




