import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputItem } from 'utils';
import { UserService } from '../user.service';

@Component({ selector: 'pg-signup', templateUrl: './signup.component.html' })
export class SignupComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;
	isLoaded = false;
	properties: InputItem[] = [
		{ label: 'Email' },
		{ label: 'First Name' },
		{ label: 'Last Name' },
		{ label: 'Password', type: 'password' } as InputItem,
	].map((_) => new InputItem(_));

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private usrSvc: UserService,
		private lctSvc: Location,
	) {}

	async ngOnInit() {
		this.form = this.formBuilder.group(
			Object.assign(
				{},
				...this.properties.map((v) => ({
					[v.label]: [
						v.defaultValue,
						v.required ? Validators.required : Validators.nullValidator,
					],
				})),
			),
		);

		this.usrSvc.required((usr) => {
			if (usr) this.router.navigateByUrl('/user');
			else this.isLoaded = true;
		});
	}

	get controls() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.form.invalid) return;

		this.loading = true;
		this.usrSvc.execute(
			'signup',
			{
				email: this.controls['Email'].value,
				password: this.controls['Password'].value,
				firstName: this.controls['First Name'].value,
				lastName: this.controls['Last Name'].value,
				description: '',
			},
			(value: any) => {
				if (value.success) this.router.navigateByUrl('/user');
			},
			() => (this.loading = false),
		);
	}
}
