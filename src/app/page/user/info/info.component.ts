import { Component, OnInit } from '@angular/core';
import { IUser } from 'place-review-types';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';

@Component({ selector: 'pg-user-info', templateUrl: './info.component.html' })
export class InfoComponent implements OnInit {
	constructor(
		private usrSvc: UserService,
		private appSvc: AppService,
	) {}
	user: IUser;

	async ngOnInit() {
		this.usrSvc.required((usr) => {
			if (!usr) this.appSvc.nav('/user/login');
			this.user = usr;
		});
	}

	logout() {
		this.usrSvc.execute('logout', {
			onNext: () => this.appSvc.nav('/user/login'),
		});
	}
}
