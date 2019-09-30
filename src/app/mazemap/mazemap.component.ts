import { Component, OnInit } from '@angular/core';

declare let Mazemap: any;

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.scss']
})
export class MazemapComponent implements OnInit {

  map: object;
  mapOptions: object;

  constructor() {
   }

  ngOnInit() {
    this.mapOptions = {
      // The DOM element ID for the map
      container: 'map',
      // The ID of the campus to show
      campuses: 89,
      // Initial position of map
      center: {lng: 12.5233250, lat: 55.78655},
      // Initial zoom of map
      zoom: 18,
      // Initial floor z level of map
      zLevel: 2,
    };

    this.map = new Mazemap.Map(this.mapOptions);
  }

}
