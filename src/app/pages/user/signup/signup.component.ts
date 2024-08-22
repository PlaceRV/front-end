import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
	selector: 'pg-signup',
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.sass',
})
export class SignupComponent implements OnInit {
	returnLogin() {
		throw new Error('Method not implemented.');
	}
	form!: FormGroup;
	loading = false;
	submitted = false;
	isLoaded = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private usrSvc: UserService,
		private lctSvc: Location,
	) {}

	async ngOnInit() {
		this.form = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});

		this.usrSvc.subscribe((usr) =>
			usr === null ? (this.isLoaded = true) : this.lctSvc.back(),
		);
	}

	get f() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.form.invalid) return;

		this.loading = true;
		this.usrSvc.execute(
			'signup',
			{
				email: this.f['email'].value,
				password: this.f['password'].value,
				firstName: this.f['firstName'].value,
				lastName: this.f['lastName'].value,
			},
			(value: any) => {
				if (value.success) this.router.navigateByUrl('/user');
			},
			() => {
				this.loading = false;
			},
		);
	}
}
