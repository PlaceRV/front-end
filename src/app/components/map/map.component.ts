import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { MapService } from './map.service';

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
					center: [0, 0],
					zoom: 2,
					maxZoom: 18,
				}),
				controls: [],
			}),
		);

		const coordinates = [
			[53.38886, 12.517037],
			[83.397634, 22.529407],
		];

		this.mapSvc.showRoute(coordinates);
	}
}
