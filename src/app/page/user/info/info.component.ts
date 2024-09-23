import { Component } from '@angular/core';
import { IUser } from 'place-review-types';
import { BaseComponent } from 'utils';

@Component({ selector: 'pg-user-info', templateUrl: './info.component.html' })
export class InfoComponent extends BaseComponent {
	user: IUser;

	constructor() {
		super();

		this.OnInit = async () =>
			await this.usrSvc.execute('user', {
				onNext: ({ value }) => {
					this.user = value;
					this.status.pageLoaded = true;
				},
				onError: () => this.appSvc.nav('/user/login'),
			});
		this.OnDestroy = () => {
			console.log('info');
		};
	}

	logout() {
		this.usrSvc.execute('logout', {
			onNext: () => this.appSvc.nav('/user/login'),
		});
	}
}
