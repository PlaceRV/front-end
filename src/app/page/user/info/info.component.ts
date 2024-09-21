import { Component } from '@angular/core';
import { IUser } from 'place-review-types';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { BaseComponent } from 'utils';

@Component({ selector: 'pg-user-info', templateUrl: './info.component.html' })
export class InfoComponent extends BaseComponent {
	user: IUser;

	constructor(
		private usrSvc: UserService,
		private appSvc: AppService,
	) {
		super();

		this.OnInit = () =>
			this.usrSvc.execute('user', {
				onAny: (usr: IUser) => {
					if (!usr) this.appSvc.nav('/user/login');
					else {
						this.user = usr;
						this.status.pageLoaded = true;
					}
				},
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
