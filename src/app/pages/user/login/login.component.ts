import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'pg-user-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
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
			email: ['', Validators.required],
			password: ['', Validators.required],
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
				environment.backendUrl('/auth/login'),
				{
					email: this.f['email'].value,
					password: this.f['password'].value,
				},
				{ withCredentials: true }
			)
			.subscribe({
				next: (req: any) => {
					if (req.success) this.router.navigateByUrl('/user');
				},
				error: (err) => {
					console.error(err.error.message);
					this.loading = false;
				},
			});
	}
}
