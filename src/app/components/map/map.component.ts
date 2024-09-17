import { Component, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { MapService } from '../../service/map.service';

@Component({
	selector: 'cp-map',
	template: '<div id="map" style="width: 100%; height: 100%;"></div>',
})
export class MapComponent implements OnInit {
	constructor(private mapSvc: MapService) {}
	async ngOnInit() {
		this.mapSvc.init(
			new Map({
				layers: [new TileLayer({ source: new OSM() })],
				target: 'map',
				view: new View({
					center: fromLonLat([106.67583063, 10.76833026]),
					zoom: 14,
				}),
				controls: [],
			}),
		);
	}
}
