import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { InputItem } from '../../../../utils';

@Component({
	selector: 'pg-user-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;
	isLoaded = false;
	properties: InputItem[] = [
		{ label: 'Email' },
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
			'login',
			{
				email: this.controls['Email'].value,
				password: this.controls['Password'].value,
			},
			(req: any) => {
				if (req.success) this.router.navigateByUrl('/user');
			},
			() => (this.loading = false),
		);
	}
}
