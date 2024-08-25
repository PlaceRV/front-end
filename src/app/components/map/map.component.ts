import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { OSM } from 'ol/source';
import { MapService } from './map.service';
import { fromLonLat } from 'ol/proj';

@Component({
	selector: 'cp-map',
	template: '<div id="map" style="width: 100%; height: 100%;"></div>',
})
export class MapComponent implements OnInit {
	constructor(private mapSvc: MapService) {}
	async ngOnInit() {
		this.mapSvc.init(
			new Map({
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
				],
				target: 'map',
				view: new View({
					center: fromLonLat([106.67583063, 10.76833026]),
					zoom: 14,
				}),
				controls: [],
			}),
		);

		// this.mapSvc.subscribe((value) => {
		// 	if (!value) return; 11877618 1206460

		// 	const coordinates = [
		// 		[value.coordinate[0], value.coordinate[1]],
		// 		[83.397634, 22.529407],
		// 	];

		// 	this.mapSvc.showRoute(coordinates);
		// });
	}
}
