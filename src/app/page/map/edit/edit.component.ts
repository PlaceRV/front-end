import { Component } from '@angular/core';
import { toLonLat } from 'ol/proj';
import { matching, PlaceType, Role } from 'place-review-types';
import { Subscription } from 'rxjs';
import { MapService } from 'service/map.service';
import { BaseComponent, InputItem } from 'utils';

@Component({ selector: 'pg-edit', templateUrl: './edit.component.html' })
export class EditComponent extends BaseComponent {
	private mapSubscription: Subscription;

	constructor(private mapSvc: MapService) {
		super();

		this.OnInit = (): void => {
			this.usrSvc.execute('user', {
				onAny: ({ value }) => {
					if (!value || !matching(value.roles, [Role.STAFF]))
						this.appSvc.nav('/user');
					else this.status.pageLoaded = true;
				},
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
		};
		this.OnDestroy = () => {
			console.log('edit');
			if (this.mapSubscription) this.mapSubscription.unsubscribe();
		};
		this.OnSubmit = () => {
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
		};

		this.properties = InputItem.many([
			{ label: 'Longitude', readonly: true },
			{ label: 'Latitude', readonly: true },
			{ label: 'Name' },
			{ label: 'Description', required: false },
		]);
	}
}
