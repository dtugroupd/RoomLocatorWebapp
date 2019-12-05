import { Section } from 'src/app/models/mazemap/section.model';
import { MapLocation } from 'src/app/models/mazemap/map-location.model';
import { Event } from 'src/app/models/calendar/event.model';
import * as moment from 'moment';

// Convert sections from backend to layers readable by MazeMap
export function convertSectionsToLayers(ls: Array<Section>) {
    const sectionLayers = [];

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

        sectionLayers.push(lsLayer);
    });

    return sectionLayers;
}

export function getLocationBoundsAsGeoJSON(location: MapLocation) {
  const coordinates = location.coordinates.map(l => {
        return [l.longitude, l.latitude];
  });

  return {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates
      }
    }
  };
}

export function inside(point, vs) {
  const x = point[0];
  const y = point[1];
  let isInside = false;

  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0];
    const yi = vs[i][1];
    const xj = vs[j][0];
    const yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
}

export function convertLocationsToLayers(ls: MapLocation[]) {

      const locationLayers = [];

      ls.forEach(x => {
        const lsLayer = {
          id: `${x.id}`,
          name: `${x.name}`,
          type: 'symbol',
          bounds: getLocationBoundsAsGeoJSON(x),
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                description: '\n\n\n' + x.name,
                id: x.id
              },
              geometry: {
                type: 'Point',
                coordinates: [x.longitude, x.latitude]
              }
            }
          },
          layout: {
            visibility: 'visible',
            'text-field': ['get', 'description'],
            'text-justify': 'right',
            'icon-image': getLocationIcon(x.name),
            'icon-size': 1.5
          },
        };

        locationLayers.push(lsLayer);
      });

      return locationLayers;
}

export function getLocationIcon(name: string) {
  switch (name) {
    case 'Bibliotek':
      return 'library';
    case 'Skylab':
      return 'rocket';
    default:
      return 'marker';
  }
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

export function getMarkerIconUrl(section: Section) {
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

export function locationMarkerOptions() {
  return {
    default: {
      color: 'MazeBlue',
      size: 50,
    }
  };
}
export function markerOptions(layer, zLevel?: number) {
    return {
      default: {
        color: 'MazeGreen',
        size: 50,
        offZOpacity: 0,
        imgUrl: layer ? getMarkerIconUrl(layer.section) : null,
        imgScale: 0.5,
        innerCircle: true,
        innerCircleColor: 'white',
        innerCircleScale: 0.7,
        zLevel: layer ? layer.zLevel : null
      },
      funky: {
        color: 'MazeYellow',
        size: 35,
        offZOpacity: 0,
        imgUrl: layer ? getMarkerIconUrl(layer.section) : null,
        imgScale: 0.25,
        innerCircle: true,
        innerCircleColor: 'white',
        innerCircleScale: 0.5,
        zLevel: layer ? layer.zLevel : null
      },
      event: {
        color: 'MazeBlue',
        size: 35,
        zLevel
      }
    };
}

export function getEventMarkerPopupHTML(e: Event): string {
  return `
      <div>
          <p style="font-size: 16px; font-weight: bold">${e.title}
            <br>
            <span style="font-size: 14px; font-weight: normal">
              ${e.speakers ? e.speakers : ''}
            </span>
          <p style="font-size: 12px">${e.description}</p>
          <hr/>
          <div id="eventMarkerFooter" style="display: flex; justify-content: flex-start">
              <div style="margin-right: 20px;">
                  <div style="font-weight: bold">
                    Date
                  </div>
                  <div>
                    ${moment(e.date).format('ddd, DD-MM-YYYY')}
                  </div>
              </div>
              <div style="margin-right: 20px;">
                  <div style="font-weight: bold">
                    Time
                  </div>
                  <div>
                    ${moment(e.date).format('HH:mm')}
              </div>
              </div>
              <div>
                <div style="font-weight: bold">
                    Duration
                </div>
                <div>
                    ${
                      e.durationInHours
                        ? e.durationInHours + ' h'
                        : 'Not specified'
                    }
                </div>
              </div>
          </div>
      </div>
      `;
}
