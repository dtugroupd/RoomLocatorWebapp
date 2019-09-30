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

    // Vertical view of the library 
    // this.mapOptions = {
    //   container: 'map',
    //   campuses: 89,
    //   center: {lng: 12.5233, lat: 55.78685},
    //   zoom: 19.25,
    //   zLevel: 1,
    //   bearing: -72.8
    // };

    // Horizontal view of the library
    this.mapOptions = {
      container: 'map',
      campuses: 89,
      center: {lng: 12.5233, lat: 55.78689},
      zoom: 20,
      zLevel: 1,
      bearing: 17.3
    };
    this.map = new Mazemap.Map(this.mapOptions);
  }

}
