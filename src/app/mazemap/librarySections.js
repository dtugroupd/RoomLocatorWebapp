export const librarySections = [{
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
                lat: 55.786737824539216
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

export const librarySectionLayers =
    [{
        id: 'B101_DI000_02',
        type: 'fill',
        source: {
            type: 'geojson',
            data: null
        },
        paint:
        {
            "fill-color": "rgba(220, 150, 120, 0.25)",
        }
    },
    {
        id: 'B101_DI000_07',
        type: 'fill',
        source: {
            type: 'geojson',
            data: null
        },
        paint:
        {
            "fill-color": "rgba(220, 150, 120, 0.25)",
        }
    }]


export const features = [{
    type: 'Feature',
    properties: {
        name: "B101_DI000_02",
        zLevel: 1
    },
    geometry: {
        type: 'Polygon',
        coordinates: [[
            [
                12.523394936706552,
                55.787009187536114
            ],
            [
                12.52317152962101,
                55.78704845759867
            ],
            [
                12.523106783718134,
                55.78693157515275
            ],
            [
                12.523328398202466,
                55.78689276418302
            ],
            [
                12.523394936706552,
                55.787009187536114
            ]
        ]]
    },
    style: {
        __comment: "all SVG styles allowed",
        fill: "rgba(220, 150, 120, 0.25)",
        "stroke-width": "3",
        "   fill-opacity": 0.3
    },
    // paint: {
    //     "fill-color": "rgba(220, 150, 120, 0.25)",
    // }
},
{
    type: 'Feature',
    properties: {
        name: "B101_DI000_07",
        zLevel: 1
    },
    geometry: {
        type: 'Polygon',
        coordinates: [[
            [
                12.523259637399121,
                55.786766267668895
            ],
            [
                12.523328398202466,
                55.78689276418302
            ],
            [
                12.523106783718134,
                55.78693157515275
            ],
            [
                12.523038473405279,
                55.78680352605781
            ],
            [
                12.523259637399121,
                55.786766267668895
            ]
        ]]
    },
    style: {
        "__comment": "all SVG styles allowed",
        fill: "rgba(220, 150, 120, 0.25)",
        "stroke-width": "3",
        "fill-opacity": 0.3
    },
    // paint: {
    //     "fill-color": "rgba(220, 150, 120, 0.25)",
    // }
}
]
