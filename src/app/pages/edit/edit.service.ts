import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlace } from '@backend/place/place.interface';
import { Apollo, gql } from 'apollo-angular';
import { Coordinate } from 'ol/coordinate';
import { BehaviorSubject } from 'rxjs';

interface EditData {
	coordinate: Coordinate;
}

@Injectable({
	providedIn: 'root',
})
export class EditService extends BehaviorSubject<EditData> {
	constructor(
		private httpSvc: HttpClient,
		private graphQl: Apollo,
	) {
		super(null);
	}

	async execute(
		type: 'assign',
		body: Omit<IPlace, 'createdBy'>,
		next: (value: any) => void,
		error?: (error: any) => void,
	) {
		this.graphQl
			.mutate({
				mutation:
					type === 'assign'
						? gql`
								mutation Create($assignPlace: PlaceAssign!) {
									createPlace(assignPlace: $assignPlace)
								}
							`
						: gql``,
				variables: { assignPlace: body },
			})
			.subscribe({ next, error });
	}
}
