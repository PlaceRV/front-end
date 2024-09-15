import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AlertService } from 'components/alert/alert.service';
import { Coordinate } from 'ol/coordinate';
import {
	InterfaceCasting,
	IPlaceInfo,
	IPlaceInfoKeys,
} from 'place-review-backend';
import { BehaviorSubject } from 'rxjs';

interface EditData {
	coordinate: Coordinate;
}

@Injectable({ providedIn: 'root' })
export class EditService extends BehaviorSubject<EditData> {
	constructor(
		private graphQl: Apollo,
		private alrSvc: AlertService,
	) {
		super(null);
	}

	execute(
		type: 'assign',
		body: IPlaceInfo,
		onNext = (v: any) => v,
		onError = (e: any) => e,
		onFinal = () => null,
	) {
		this.graphQl
			.mutate({
				mutation:
					type === 'assign'
						? gql`
								mutation PlaceCreate($placeAssign: PlaceAssign!) {
									placeCreate(placeAssign: $placeAssign) {
										description
										latitude
										longitude
										name
										type
									}
								}
							`
						: gql``,
				variables: {
					placeAssign: InterfaceCasting.quick(body, IPlaceInfoKeys),
				},
			})
			.subscribe({
				next: (v: any) => {
					this.alrSvc.success('Place Assigned');
					onNext(v);
				},
				error: (e: HttpErrorResponse) => {
					this.alrSvc.error(e.message);
					onError(e);
				},
			});
		onFinal();
	}
}
