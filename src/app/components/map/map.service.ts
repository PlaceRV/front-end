import { Injectable } from '@angular/core';
import Polyline from 'ol/format/Polyline';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { BehaviorSubject } from 'rxjs';
import Icon from 'ol/style/Icon';
import { Point } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import View from 'ol/View';
import { allImplement, logMethodCall } from '@backend/utils';
import { clearMap } from 'utils';

interface MapData {
	coordinate: Coordinate;
}

@Injectable({
	providedIn: 'root',
})
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
						geometry: new Polyline({
							factor: 1e6,
						}).readGeometry(result.routes[0].geometry, {
							dataProjection: 'EPSG:4326',
							featureProjection: this.map.getView().getProjection(),
						}),
					});
				}
				throw new Error('Bad request');
			});
	}

	async showRoute(coordinates: Coordinate[]) {
		const vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: [await this.getRoute(coordinates)],
			}),
			style: new Style({
				stroke: new Stroke({
					width: 4,
					color: 'red',
				}),
			}),
		});

		this.map.addLayer(vectorLayer);
	}

	@logMethodCall
	async showMarker(coordinate: Coordinate) {
		const vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: [new Feature({ geometry: new Point(coordinate) })],
			}),
			style: new Style({
				image: new Icon({
					anchor: [0.5, 1],
					src: './favicon.ico',
				}),
			}),
		});

		this.map.addLayer(vectorLayer);
		this.setCenter(coordinate);
	}

	async clear() {
		this.map.getLayers().forEach((_) => this.map.removeLayer(_));
	}

	setCenter(coordinate: Coordinate) {
		this.map.setView(
			new View({ center: coordinate, zoom: 6, padding: [0, 0, 0, 444] }),
		);
	}
}
