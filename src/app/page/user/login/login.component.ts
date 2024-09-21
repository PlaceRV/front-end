import { Component } from '@angular/core';
import { IUser } from 'place-review-types';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { BaseComponent, InputItem } from 'utils';

@Component({
	selector: 'pg-user-login',
	templateUrl: './login.component.html',
})
export class LoginComponent extends BaseComponent {
	constructor(
		private appSvc: AppService,
		private usrSvc: UserService,
	) {
		super();

		this.OnInit = () =>
			this.usrSvc.execute('user', {
				onAny: (usr: IUser) => {
					if (!usr) this.status.pageLoaded = true;
					else this.appSvc.nav('/user');
				},
				showError: false,
			});

		this.OnSubmit = () => {
			this.status.formSummited = true;
			if (this.form.invalid) return;

			this.status.formProcessing = true;
			this.usrSvc.execute('login', {
				body: {
					email: this.controls['Email'].value,
					password: this.controls['Password'].value,
				},
				onNext: (req: any) => {
					if (req) this.appSvc.nav('/user');
				},
				onError: () => (this.status.formProcessing = false),
			});
		};

		this.properties = InputItem.many([
			{ label: 'Email' },
			{ label: 'Password', type: 'password' },
		]);
	}
}
