import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import Polyline from 'ol/format/Polyline';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { methodDecorator } from 'place-review-types';
import { BehaviorSubject } from 'rxjs';

interface MapData {
	coordinate: Coordinate;
}

@Injectable({ providedIn: 'root' })
export class MapService extends BehaviorSubject<MapData> {
	public map!: Map;

	constructor() {
		super(null);
	}

	init(map: Map) {
		this.map = map;

		this.map.on('singleclick', (event) => {
			const coordinate = this.map.getCoordinateFromPixel(event.pixel);
			this.next({ coordinate });
		});
	}

	async getRoute(coordinates: Coordinate[]) {
		return await fetch(
			`https://router.project-osrm.org/route/v1/driving/${coordinates
				.map((_) => toLonLat(_).join(','))
				.join(';')}?overview=full&geometries=polyline6`,
		)
			.then((response) => response.json())
			.then((result) => {
				if (result.code === 'Ok') {
					return new Feature({
						type: 'route',
						geometry: new Polyline({ factor: 1e6 }).readGeometry(
							result.routes[0].geometry,
							{
								dataProjection: 'EPSG:4326',
								featureProjection: this.map.getView().getProjection(),
							},
						),
					});
				}
				throw new Error('Bad request');
			});
	}

	@methodDecorator((t: MapService) => t.clear())
	async showRoute(coordinates: Coordinate[]) {
		const vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: [await this.getRoute(coordinates)],
			}),
			style: new Style({ stroke: new Stroke({ width: 4, color: 'red' }) }),
		});

		this.map.addLayer(vectorLayer);
	}

	@methodDecorator((t: MapService) => t.clear())
	async showMarker(coordinate: Coordinate) {
		const vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: [new Feature({ geometry: new Point(coordinate) })],
			}),
			style: new Style({
				image: new Icon({ anchor: [0.5, 1], src: './favicon.ico' }),
			}),
		});

		this.map.addLayer(vectorLayer);
		this.setCenter(coordinate);
	}

	@methodDecorator((_: MapService) => _.clear())
	async showMarkers(coordinates: Coordinate[]) {
		coordinates.forEach((i) => this.showMarker(i));
	}

	async clear() {
		this.map.getLayers().forEach((layer) => {
			if (layer instanceof VectorLayer) {
				this.map.removeLayer(layer);
			}
		});
	}

	setCenter(coordinate: Coordinate) {
		this.map.setView(new View({ center: coordinate, zoom: 18 }));
	}
}
