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
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private httpSvc: HttpClient
	) {}

	loginForm!: FormGroup;

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		this.httpSvc
			.post(
				environment.backendUrl('/auth/login'),
				{
					email: this.loginForm.value['email'],
					password: this.loginForm.value['password'],
				},
				{ withCredentials: true }
			)
			.subscribe({
				next: (req: any) => {
					if (req.success) this.router.navigateByUrl('/user');
				},
				error: (err) => {
					console.error(err.error.message);
				},
			});
	}

	openRegistrationPage() {
		this.router.navigateByUrl('/user/signup');
	}
}
