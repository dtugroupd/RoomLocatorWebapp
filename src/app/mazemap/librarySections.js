export const librarySections =  [{
    type: 'Feature',
    properties: {
      zLevel: 1
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
          {
            lng: 12.523574624353444,
            lat: 55.78697823298273
          },
          {
            lng: 12.523729347640625,
            lat: 55.78687781449358
          },
          {
            lng: 12.52376656677427,
            lat: 55.78694497114421
          },
          {
            lng: 12.523574624353444,
            lat: 55.78697823298273
          },
      ]
    }
  },
  {
  type: 'Feature',
    properties: {
      zLevel: 1,
      highlight: false,
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
          {
            lng: 12.522994828289313,
            lat: 55.78707842382289
          },
          {
            lng: 12.523299885346887,
            lat: 55.78702524210624
          },
          {
            lng: 12.523260109306648,
            lat: 55.78695225388648
          },
          {
            lng: 12.522954558612383,
            lat: 55.78700716886178
          },
          {
            lng: 12.522994828289313,
            lat: 55.78707842382289
          }
      ]
    }
  },
    {
      type: 'Feature',
      properties: {
        zLevel: 2
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
            {
                lng: 12.523437716818705,
                lat:55.786737824539216
            },
            {
                lng: 12.523153306259474,
                lat: 55.786788042297616
            },
            {
                lng: 12.523193688029892,
                lat: 55.78685831384567
            },
            {
                lng: 12.523476108248644,
                lat: 55.78680844474647
            },
            {
                lng: 12.523437716818705,
                lat: 55.786737824539216
            }
        ]
      }
    }]

export const librarySectionLayers = [
    {
    id: 'topRight',
    type: 'fill',
    source: {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {
            // zLevel: 1
            name: "Hej hej"
            },
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [
                        12.523574624353444,
                        55.78697823298273
                    ],
                    [
                        12.523729347640625,
                        55.78687781449358
                    ],
                    [
                        12.52376656677427,
                        55.78694497114421
                    ],
                    [
                        12.523574624353444,
                        55.78697823298273
                    ],
                ]]
            }
        }
    },
    paint: {
        "fill-color": "#fc0",
        "fill-outline-color": "white"
    }
    },
    {
    id: 'topLeft',
    type: 'fill',
    source: {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {
            // zLevel: 1,
            // highlight: false,
            name: "Hej"
            },
            geometry: {
            type: 'Polygon',
            coordinates: [[
                [
                    12.522994828289313,
                    55.78707842382289
                ],
                [
                    12.523299885346887,
                    55.78702524210624
                ],
                [
                    12.523260109306648,
                    55.78695225388648
                ],
                [
                    12.522954558612383,
                    55.78700716886178
                ],
                [
                    12.522994828289313,
                    55.78707842382289
                ]
            ]]
            }
        }
    },
    paint: {
        "fill-color": "#fc0",
        "fill-outline-color": "white"
    }
    },
    {
    id: 'bottom2nd',
    type: 'fill',
    source: {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {
                // zLevel: 2,
                name: "Anden sal"
            },
            geometry: {
            type: 'Polygon',
            coordinates: [[
                [ 
                    12.523437716818705,
                    55.786737824539216
                ],
                [
                    12.523153306259474,
                    55.786788042297616
                ],
                [
                    12.523193688029892,
                    55.78685831384567
                ],
                [
                    12.523476108248644,
                    55.78680844474647
                ],
                [
                    12.523437716818705,
                    55.786737824539216
                ]
            ]]
            }
        }
    },
    paint: {
        "fill-color": "#fc0",
        "fill-outline-color": "white"
    }
    }]