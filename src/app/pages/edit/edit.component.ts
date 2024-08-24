import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from 'cp/map/map.service';
import { Coordinate } from 'ol/coordinate';
import { UserService } from 'pg/user/user.service';

@Component({
	selector: 'pg-edit',
	templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
	coordinate: Coordinate;
	isLoaded = false;

	constructor(
		private mapSvc: MapService,
		private usrSvc: UserService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.usrSvc.required((usr) => {
			if (!usr) this.router.navigateByUrl('/login');
			this.isLoaded = true;
		});

		this.mapSvc.subscribe((value) => {
			if (value) {
				this.coordinate = value.coordinate;
				this.mapSvc.showMarker(this.coordinate);
			} else this.coordinate = [0, 0];
		});
	}
}
