import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from 'components/map/map.service';
import { Coordinate } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import { matching, PlaceType, Role } from 'place-review-types';
import { UserService } from 'service/user.service';
import { InputItem } from '../../../utils';
import { EditService } from '../../service/edit.service';

@Component({ selector: 'pg-edit', templateUrl: './edit.component.html' })
export class EditComponent implements OnInit {
	coordinate: Coordinate;
	pageLoaded = false;
	form!: FormGroup;
	processing = false;
	submitted = false;
	properties = InputItem.many([
		{ label: 'Longitude', readonly: true },
		{ label: 'Latitude', readonly: true },
		{ label: 'Name' },
		{ label: 'Description', required: false },
	]);

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
			if (!usr || !matching(usr.roles, [Role.STAFF]))
				this.router.navigateByUrl('/user');
			else this.pageLoaded = true;
		});

		this.mapSvc.subscribe((value) => {
			if (value && this.pageLoaded) {
				this.edtSvc.next({ coordinate: value.coordinate });
				this.mapSvc.showMarker(value.coordinate);
			}
		});

		this.edtSvc.subscribe((v) => {
			if (v) {
				this.coordinate = toLonLat(v.coordinate);
				this.form.patchValue({
					Longitude: this.coordinate[0],
					Latitude: this.coordinate[1],
				});
			}
		});
	}

	async onSubmit() {
		this.submitted = true;
		if (this.form.invalid) return;

		this.processing = true;
		this.edtSvc.execute(
			'assign',
			{
				latitude: this.controls['Latitude'].value,
				longitude: this.controls['Longitude'].value,
				name: this.controls['Name'].value,
				type: PlaceType.TEMPLE,
				description: this.controls['Description'].value,
			},
			() => 0,
			() => 0,
			() => (this.processing = false),
		);
	}
}
