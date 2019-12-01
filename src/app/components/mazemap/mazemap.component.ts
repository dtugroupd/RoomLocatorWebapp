/**
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibrarySection } from 'src/app/models/mazemap/library-section.model';
import { Store, Select } from '@ngxs/store';
import { GetLibrarySections, SetActiveSection, SetActivateFeedbackAndStatus } from '../../_actions/mazemap.actions';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MazemapState } from '../../_states/mazemap.state';
import { Observable } from 'rxjs';
import { toLatLng, getCenter, convertLibrarySectionsToLayers, layerMarkerOptions } from './mazemap-helper';

declare let Mazemap: any;

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.scss'],
  animations: [
    trigger('showHideSurveyButton', [
      state('show', style({
        height: '45px',
        opacity: 1,
      })),
      state('hide', style({
        height: '0px',
        opacity: 0.0,
      })),
      transition('show => hide', [
        animate('0.15s ease-in-out')
      ]),
      transition('hide => show', [
        animate('0.15s ease-in-out')
      ]),
    ]),
    trigger('showHideStatusMenu', [
      state('show', style({
        height: '200px',
        opacity: 1,
      })),
      state('hide', style({
        height: '0px',
        opacity: 0.0,
      })),
      transition('show => hide', [
        animate('0.15s ease-in-out')
      ]),
      transition('hide => show', [
        animate('0.15s ease-in-out')
      ]),
    ])
  ]
})

export class MazemapComponent implements OnInit, OnDestroy {

  map: any;
  mapOptions: object;
  promptFeedback = false;
  showStatusMenu = false;
  activateFeedbackAndStatus = false;
  lastHoveredLayer = null;
  activeLayer = null;
  activeLayerMarker = null;
  popup = null;
  defaultColor = 'rgba(220, 150, 120, 0.075)';
  hoverColor = 'rgba(220, 150, 120, 0.25)';
  activeColor = 'rgba(220, 150, 120, 0.75)';
  librarySections: LibrarySection[] = [];
  librarySectionLayers = [];

  @Select(MazemapState.getLibrarySections) librarySections$: Observable<LibrarySection[]>;
  @Select(MazemapState.getActivateFeedbackAndStatus) activateFeedbackAndStatus$: Observable<boolean>;

  constructor(private store: Store) {
      this.activateFeedbackAndStatus$.subscribe(x => {
        this.activateFeedbackAndStatus = x;
      });

      // Get library sections from store and convert to layers
      this.store.dispatch(GetLibrarySections).subscribe(x => {
        this.librarySections = x.MazeMap.librarySections;
        this.librarySectionLayers = convertLibrarySectionsToLayers(this.librarySections);
      });
   }

  ngOnInit() {

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
       autoSetRTLTextPlugin: false,
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

  }

  ngOnDestroy() {
    this.store.dispatch(new SetActivateFeedbackAndStatus(false));
    this.store.dispatch(new SetActiveSection(null));
    this.map.remove();
  }

  toggleStatusMenu() {
    this.showStatusMenu = !this.showStatusMenu;
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
        this.setActiveLayer(layer);
        this.openFeedbackPrompt();
      });

      this.map.layerEventHandler.on('mousemove', layer.id, () => {
        this.setLayerHoverState(layer.id);
      });

      const featureCoordinates = toLatLng(layer.source.data.geometry.coordinates[0]);
      const center = getCenter(featureCoordinates);
      const marker = new Mazemap.MazeMarker(layerMarkerOptions(layer).default).setLngLat(center).addTo(this.map);

      marker.on('click', () => {
        this.setActiveLayer(layer);
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

    this.activeLayer = layer.id;
    this.store.dispatch(new SetActiveSection(layer.section));
  }

  openFeedbackPrompt() {
    this.promptFeedback = true;
  }

  closeFeedbackPrompt() {
    this.promptFeedback = false;
  }

}




