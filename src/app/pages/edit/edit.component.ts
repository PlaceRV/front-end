import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isMatchRoles, Role } from '@backend/user/user.entity';
import { MapService } from 'cp/map/map.service';
import { Coordinate } from 'ol/coordinate';
import { UserService } from 'pg/user/user.service';
import { InputItem } from 'utils';
import { EditService } from './edit.service';

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
	properties: InputItem[] = [
		{ label: 'Longitude', readonly: true },
		{ label: 'Latitude', readonly: true },
		{ label: 'Name' },
		{ label: 'Description', required: false },
	].map((_) => new InputItem(_));

	constructor(
		private mapSvc: MapService,
		private usrSvc: UserService,
		private router: Router,
		private formBuilder: FormBuilder,
		private edtSvc: EditService,
	) {}

	get controls() {
		return this.form.controls;
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group(
			Object.assign(
				{},
				...this.properties.map((v) => ({
					[v.label]: [
						v.defaultValue,
						v.required ? Validators.required : Validators.nullValidator,
					],
				})),
			),
		);

		this.usrSvc.required((usr) => {
			if (!usr || !isMatchRoles(usr.roles, [Role.STAFF]))
				this.router.navigateByUrl('/user');
			else this.isLoaded = true;
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
					Longitude: this.coordinate[0],
					Latitude: this.coordinate[1],
				});
			}
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) return;

		this.loading = true;
		this.usrSvc.execute(
			'login',
			{
				longitude: this.controls['longitude'].value,
				latitude: this.controls['latitude'].value,
			},
			(req: any) => {
				if (req.success) this.router.navigateByUrl('/user');
			},
			() => (this.loading = false),
		);
	}
}
