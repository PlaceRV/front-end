import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { toLonLat } from 'ol/proj';
import { matching, PlaceType, Role } from 'place-review-types';
import { Subscription } from 'rxjs';
import { AppService } from 'service/app.service';
import { MapService } from 'service/map.service';
import { UserService } from 'service/user.service';
import { BaseComponent, InputItem } from '../../../../utils';

@Component({ selector: 'pg-edit', templateUrl: './edit.component.html' })
export class EditComponent extends BaseComponent {
	private mapSubscription: Subscription;

	properties = InputItem.many([
		{ label: 'Longitude', readonly: true },
		{ label: 'Latitude', readonly: true },
		{ label: 'Name' },
		{ label: 'Description', required: false },
	]);

	constructor(
		private mapSvc: MapService,
		private usrSvc: UserService,
		private appSvc: AppService,
		protected formBuilder: FormBuilder,
		protected router: Router,
	) {
		super();
		this.onLeaveUrl = () => console.log('edit');
		this.initForm(this.properties);
	}

	OnInit(): void {
		this.usrSvc.required((usr) => {
			if (!usr || !matching(usr.roles, [Role.STAFF]))
				this.appSvc.nav('/user/info');
			else this.status.pageLoaded = true;
		});

		this.mapSvc.set({ coordinate: null });
		this.mapSubscription = this.mapSvc.subscribe((value) => {
			if (value.coordinate) {
				this.mapSvc.showMarker(value.coordinate);
				const lonLat = toLonLat(value.coordinate);
				this.form.patchValue({
					Longitude: lonLat[0],
					Latitude: lonLat[1],
				});
			}
		});
	}

	OnDestroy(): void {
		if (this.mapSubscription) this.mapSubscription.unsubscribe();
	}

	async OnSubmit() {
		this.status.formSummited = true;
		if (this.form.invalid) return;

		this.status.formProcessing = true;
		this.mapSvc.assign(
			{
				latitude: this.controls['Latitude'].value,
				longitude: this.controls['Longitude'].value,
				name: this.controls['Name'].value,
				type: PlaceType.TEMPLE,
				description: this.controls['Description'].value,
			},
			{ onFinal: () => (this.status.formProcessing = false) },
		);
	}
}
