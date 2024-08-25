import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from 'cp/map/map.service';
import { Coordinate } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import { UserService } from 'pg/user/user.service';

@Component({
	selector: 'pg-edit',
	templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
	coordinate: Coordinate;
	isLoaded = false;
	form!: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private mapSvc: MapService,
		private usrSvc: UserService,
		private router: Router,
		private formBuilder: FormBuilder,
	) {}

	get f() {
		return this.form.controls;
	}

	ngOnInit(): void {
		this.usrSvc.required((usr) => {
			if (!usr) this.router.navigateByUrl('/login');
			this.isLoaded = true;
		});

		this.form = this.formBuilder.group({
			longitude: ['', Validators.required],
			latitude: ['', Validators.required],
		});

		this.mapSvc.subscribe((value) => {
			if (value) {
				this.coordinate = toLonLat(value.coordinate);
				this.mapSvc.showMarker(value.coordinate);
			} else this.coordinate = [0, 0];
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) return;

		this.loading = true;
		this.usrSvc.execute(
			'login',
			{
				longitude: this.f['longitude'].value,
				latitude: this.f['latitude'].value,
			},
			(req: any) => {
				if (req.success) this.router.navigateByUrl('/user');
			},
			() => (this.loading = false),
		);
	}
}
