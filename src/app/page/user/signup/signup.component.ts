import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { BaseComponent, InputItem } from '../../../../utils';

@Component({ selector: 'pg-signup', templateUrl: './signup.component.html' })
export class SignupComponent
	extends BaseComponent
	implements OnInit, OnDestroy
{
	properties = InputItem.many([
		{ label: 'Email' },
		{ label: 'First Name' },
		{ label: 'Last Name' },
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
		this.onLeaveUrl = () => console.log('signup');
	}

	async ngOnInit() {
		super.ngOnInit();

		await this.usrSvc.required(
			(usr) => {
				if (!usr) this.status.pageLoaded = true;
				else this.appSvc.nav('/user');
			},
			{ showError: false },
		);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	onSubmit() {
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
				if (value.success) this.appSvc.nav('/user');
			},
			onError: () => (this.status.formProcessing = false),
		});
	}
}
