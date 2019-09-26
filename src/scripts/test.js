/*
<!DOCTYPE html>

<head>
  <meta name="viewport" id="vp" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
  <meta charset="utf-8" />

  <link rel="stylesheet" href="https://api.mazemap.com/js/v2.0.14/mazemap.min.css" />
  

  <style>
    body {
      margin: 0px;
      padding: 0px;
      width: 100vw;
      height: 100vh;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.42857143;
    }

    hr {
      border: 0;
      height: 1px;
      background-color: rgb(216, 216, 216);
    }

    #poidata {
      border-left: 1px solid rgb(230, 230, 230);
      width: 50%;
      position: absolute;
      right: 0px;
      top: 0px;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      overflow: auto;
    }
  </style>
</head>

<body>
  <div id="map" class="mazemap"></div>


  <script>

    var myMap = new Mazemap.Map({
      container: "map",
      campuses: 89,

      center: { lng: 12.52026114549633, lat: 55.78498471097425 },

      zoom: 19,
      zLevel: 1,
      scrollZoom: true,
      doubleClickZoom: false,
      touchZoomRotate: false
    });

    myMap.on("load", function () {
      // Initialize a Highlighter for POIs
      // Storing the object on the map just makes it easy to access for other things
      myMap.highlighter = new Mazemap.Highlighter(myMap, {
        showOutline: true,
        showFill: true,
        outlineColor: Mazemap.Util.Colors.MazeColors.MazeBlue,
        //outlineColor: false,

        fillColor: Mazemap.Util.Colors.MazeColors.MazeBlue
      });
      myMap.on("click", onMapClick);
    });

    // define a global
    var mazeMarker;
    var start;
    var dest;
    var count = 0;
    // ********** ON CLICK **********
    function onMapClick(e) {
      count++;
      var lngLat = e.lngLat;
      var zLevel = myMap.zLevel;

      if (count == 1) {
        start = { lngLat: lngLat, zLevel: zLevel };
      } else if (count == 2) {
        dest = { lngLat: lngLat, zLevel: zLevel };
      } else {
        var r = confirm("Reset current Route?");
        if (r == true) {
          window.location.reload();
        } else {
          return;
        }
      }
      {
      }
      // Fetching via Data API
      Mazemap.Data.getPoiAt(lngLat, zLevel)
        .then(poi => {
          //console.log("POI_1", poi);
          //printPoiData(poi);
          placePoiMarker(poi);
        })
        .catch(function () {
          return false;
        });
    }

    // ********** CLEAR POI MARKER **********
    function clearPoiMarker(poi) {
      if (mazeMarker) {
        mazeMarker.remove();
      }
      myMap.highlighter.clear();
    }

    // ********** PLACE POI MARKER **********
    function placePoiMarker(poi) {
      // Get a center point for the POI, because the data can return a polygon instead of just a point sometimes
      var lngLat = Mazemap.Util.getPoiLngLat(poi);

      mazeMarker = new Mazemap.MazeMarker({
        color: "#ff00cc",
        innerCircle: true,
        innerCircleColor: "#FFF",
        size: 34,
        innerCircleScale: 0.5,
        zLevel: poi.properties.zLevel
      })
        .setLngLat(lngLat)
        .addTo(myMap);

      // If we have a polygon, use the default 'highlight' function to draw a marked outline around the POI.
      console.log("aaa", poi.geometry.type);
      //if (poi.geometry.type === "Polygon") {
      //    myMap.highlighter.highlight(poi);
      //}
      myMap.flyTo({ center: lngLat, zoom: 19, speed: 0.5 });

      // route code start
      console.log(start, dest);
      if (start && dest) {
        routeController = new Mazemap.RouteController(myMap, {
          routeLineColorPrimary: "#0099EA",
          routeLineColorSecondary: "#888888"
        });
        setRoute(start, dest);
      }
    }
    // ********** SET ROUTE **********
    function setRoute(start, dest) {
      routeController.clear(); // Clear existing route, if any

      Mazemap.Data.getRouteJSON(start, dest).then(function (geojson) {
        routeController.setPath(geojson);
        var bounds = Mazemap.Util.Turf.bbox(geojson);
        myMap.fitBounds(bounds, { padding: 100 });
      });
    }
  </script>
</body>*/