import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
	selector: 'pg-signup',
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.sass',
})
export class SignupComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private httpSvc: HttpClient
	) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	get f() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.form.invalid) return;

		this.loading = true;
		this.httpSvc
			.post(
				environment.backendUrl('/auth/signup'),
				{
					email: this.f['email'].value,
					password: this.f['password'].value,
					firstName: this.f['firstName'].value,
					lastName: this.f['lastName'].value,
				},
				{ withCredentials: true }
			)
			.subscribe({
				next: (value: any) => {
					if (value.success) this.router.navigateByUrl('/user');
				},
				error: (err) => {
					this.loading = false;
				},
			});
	}
}
