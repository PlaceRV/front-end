import { Injectable } from '@angular/core';
import Polyline from 'ol/format/Polyline';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

@Injectable({
	providedIn: 'root',
})
export class MapService {
	public map!: Map;

	init(map: Map) {
		this.map = map;
	}

	async getRoute(coordinates: number[][]) {
		return await fetch(
			`https://router.project-osrm.org/route/v1/driving/${coordinates
				.map((coord) => coord.join(','))
				.join(';')}?overview=full&geometries=polyline6`
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

	async showRoute(coordinates: number[][]) {
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
}
