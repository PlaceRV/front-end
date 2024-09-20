import { Component } from '@angular/core';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { BaseComponent, InputItem } from 'utils';

@Component({ selector: 'pg-signup', templateUrl: './signup.component.html' })
export class SignupComponent extends BaseComponent {
	constructor(
		private appSvc: AppService,
		private usrSvc: UserService,
	) {
		super();

		this.OnInit = () =>
			this.usrSvc.required({
				showError: false,
				onSubscribe: (usr) => {
					if (!usr) this.status.pageLoaded = true;
					else this.appSvc.nav('/user');
				},
			});
		this.OnDestroy = () => console.log('signup');
		this.OnSubmit = () => {
			this.status.formSummited = true;
			if (this.form.invalid) return;

			this.status.formProcessing = true;
			this.usrSvc.execute('signup', {
				body: {
					email: this.controls['Email'].value,
					password: this.controls['Password'].value,
					firstName: this.controls['First Name'].value,
					lastName: this.controls['Last Name'].value,
					description: '',
				},
				onNext: (value: any) => {
					if (value) this.appSvc.nav('/user');
				},
				onError: () => (this.status.formProcessing = false),
			});
		};

		this.properties = InputItem.many([
			{ label: 'Email' },
			{ label: 'First Name' },
			{ label: 'Last Name' },
			{ label: 'Password', type: 'password' },
		]);
	}
}
