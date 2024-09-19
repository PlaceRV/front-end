import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'place-review-types';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { BaseComponent } from '../../../../utils';

@Component({ selector: 'pg-user-info', templateUrl: './info.component.html' })
export class InfoComponent extends BaseComponent {
	user: IUser;

	constructor(
		private usrSvc: UserService,
		private appSvc: AppService,
		protected router: Router,
		protected formBuilder: FormBuilder,
	) {
		super();
		this.onLeaveUrl = () => {
			console.log('info');
		};
	}

	async OnInit() {
		this.usrSvc.required((usr) => {
			if (!usr) this.appSvc.nav('/user/login');
			else {
				this.user = usr;
				this.status.pageLoaded = true;
			}
		});
	}

	logout() {
		this.usrSvc.execute('logout', {
			onNext: () => this.appSvc.nav('/user/login'),
		});
	}
}
