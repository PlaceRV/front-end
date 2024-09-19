import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { BaseComponent, InputItem } from '../../../../utils';

@Component({
	selector: 'pg-user-login',
	templateUrl: './login.component.html',
})
export class LoginComponent extends BaseComponent {
	properties = InputItem.many([
		{ label: 'Email' },
		{ label: 'Password', type: 'password' },
	]);

	constructor(
		private appSvc: AppService,
		private usrSvc: UserService,
		protected router: Router,
		protected formBuilder: FormBuilder,
	) {
		super();
		this.initForm(this.properties);
	}

	async OnInit() {
		this.usrSvc.required(
			(usr) => {
				if (!usr) this.status.pageLoaded = true;
				else this.appSvc.nav('/user/info');
			},
			{ showError: false },
		);
	}

	OnSubmit() {
		this.status.formSummited = true;
		if (this.form.invalid) return;

		this.status.formProcessing = true;
		this.usrSvc.execute('login', {
			body: {
				email: this.controls['Email'].value,
				password: this.controls['Password'].value,
			},
			onNext: (req: any) => {
				if (req.success) this.appSvc.nav('/user/info');
			},
			onError: () => (this.status.formProcessing = false),
		});
	}
}
