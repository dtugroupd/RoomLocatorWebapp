import { Component, OnInit } from '@angular/core';

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
      zoom: 20.1,
      zLevel: 1,
      bearing: 17.3
    };

    // Create map instance with these options
    this.map = new Mazemap.Map(this.mapOptions);
    var url = "./../assets/sensor-icon.png";
    var customID = "custom-marker-1";
    var imagePixelRatio = 2; // This image is optimized for retina screens

    // When the map has loaded, add a marker to the center of the map
    this.map.on('load', () => {
      var lngLat = this.map.getCenter();
      var marker = new Mazemap.MazeMarker( {
          color: "MazeBlue",
          size: 36,
          zLevel: 1,
          imgUrl: "./../assets/sensor-icon.png",
          imgScale: 1.25
      }).setLngLat(lngLat);
      marker.addTo(this.map);

      // Load sensor image and display on marker
      this.map.loadImage(url, (error, loadedImage) => {
          this.map.addImage(customID, loadedImage, {pixelRatio: imagePixelRatio});
          var customLayer = new Mazemap.CustomPoisLayer(this.map, {
            layerProperties: {
              layout: {
                  "icon-image": customID,
                  "icon-offset": [0, -23.5] // offset in x,y to get right placement. Default is [0,0] which is the center of your image
              }
          }
          });
          Mazemap.Data.getPoisByCategoryAndCampusId(1686,89).then(pois => {
      
            customLayer.setPois(pois);
        
          });
      });

      // Find buildings on campus, specifically building 101
      Mazemap.Data.getBuildingsByCampusId(89).then( buildings => console.log(buildings.filter(a => a.properties.name === "101")))

      // Building 101 ID is 653 - lookup (prints the same as the statement above)
      Mazemap.Data.getBuilding(653).then(building => console.log(building));
      
      // Find Points of Interest on campus, specifically the entrance to the library
      Mazemap.Data.getPois({campusid: 89, buildingid: 653}).then(pois => console.log(pois.filter(p => p.properties.identifier === "Bygning 101-2.022")));
    });
    
    
    



  }


}
