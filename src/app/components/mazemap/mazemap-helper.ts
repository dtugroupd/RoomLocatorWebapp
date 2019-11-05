import { LibrarySection } from 'src/app/models/mazemap/library-section.model';

// Convert sections from backend to layers readable by MazeMap
export function convertLibrarySectionsToLayers(ls: Array<LibrarySection>) {
    const librarySectionLayers = [];

    ls.forEach(x => {
        const coordinates = x.coordinates.map(c => {
        return [c.longitude, c.latitude];
        });

        const lsLayer = {
        id: `${x.id}`,
        type: 'fill',
        section: x,
        zLevel: x.zLevel,
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {
                    name: `${x.id}`,
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

        librarySectionLayers.push(lsLayer);
    });

    return librarySectionLayers;
}

export function getCenter(coordinates) {
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

export function toLatLng(coordinates) {
const latLng = coordinates.map(c => {
    return { lat: c[0], lng: c[1]};
});

return latLng;
}

export function getMarkerIconUrl(section: LibrarySection) {
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

export function layerMarkerOptions(layer) {
    return  {
        default:  {
            color: 'MazeGreen',
            size: 50,
            offZOpacity: 0,
            imgUrl: getMarkerIconUrl(layer.section),
            imgScale: 0.5,
            innerCircle: true,
            innerCircleColor: 'white',
            innerCircleScale: 0.7,
            zLevel: layer.zLevel
        },
        funky: {
            color: 'MazeYellow',
            size: 35,
            offZOpacity: 0,
            imgUrl: getMarkerIconUrl(layer.section),
            imgScale: 0.25,
            innerCircle: true,
            innerCircleColor: 'white',
            innerCircleScale: 0.5,
            zLevel: layer.zLevel
        }
    };
}