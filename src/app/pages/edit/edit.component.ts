import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from 'cp/map/map.service';
import { Coordinate } from 'ol/coordinate';
import { UserService } from 'pg/user/user.service';
import { EditService } from './edit.service';

@Component({
	selector: 'pg-edit',
	templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit, OnDestroy {
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
		private edtSvc: EditService,
	) {}

	get f() {
		return this.form.controls;
	}

	ngOnInit(): void {
		this.usrSvc.required((usr) => {
			if (!usr) this.router.navigateByUrl('/user/login');
		});

		this.form = this.formBuilder.group({
			longitude: ['', Validators.required],
			latitude: ['', Validators.required],
			name: ['', Validators.required],
		});

		this.mapSvc.subscribe((value) => {
			if (value && this.isLoaded) {
				this.edtSvc.next({ coordinate: value.coordinate });
				this.mapSvc.showMarker(value.coordinate);
			}
		});

		this.edtSvc.subscribe((v) => {
			if (v) {
				this.coordinate = v.coordinate;
				this.form.patchValue({
					longitude: this.coordinate[0],
					latitude: this.coordinate[1],
				});
			}
		});

		this.isLoaded = true;
	}

	ngOnDestroy(): void {
		this.isLoaded = false;
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
