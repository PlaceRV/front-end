import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'service/app.service';
import { UserService } from 'service/user.service';
import { InputItem } from '../../../../utils';

@Component({ selector: 'pg-signup', templateUrl: './signup.component.html' })
export class SignupComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;
	isLoaded = false;
	properties = InputItem.many([
		{ label: 'Email' },
		{ label: 'First Name' },
		{ label: 'Last Name' },
		{ label: 'Password', type: 'password' },
	]);

	constructor(
		private formBuilder: FormBuilder,
		private appSvc: AppService,
		private usrSvc: UserService,
	) {}

	async ngOnInit() {
		this.form = this.formBuilder.group(AppService.formAssign(this.properties));

		this.usrSvc.required(
			(usr) => {
				if (!usr) this.isLoaded = true;
				else this.appSvc.nav('/user');
			},
			{ showError: false },
		);
	}

	get controls() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) return;

		this.loading = true;
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
			onError: () => (this.loading = false),
		});
	}
}
