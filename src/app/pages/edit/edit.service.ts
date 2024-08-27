import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceAssign } from '@backend/place/place.dto';
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

	async execute(type: 'assign', body: PlaceAssign) {
		this.graphQl.mutate({
			mutation:
				type === 'assign'
					? gql`
							mutation Create($assignPlace: PlaceAssign!) {
								createPlace(assignPlace: $assignPlace)
							}
						`
					: '',
			variables: body,
		});
	}
}
