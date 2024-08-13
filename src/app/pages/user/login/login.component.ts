import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
	selector: 'pg-user-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.sass',
})
export class LoginComponent {
	constructor(private httpSvc: HttpClient, private router: Router) {}
	user = { email: null, password: null };

	onSubmit(user: any) {
		this.httpSvc
			.post(
				environment.backendUrl('/auth/login'),
				{
					email: user.email,
					password: user.password,
				},
				{ reportProgress: true, observe: 'events', withCredentials: true }
			)
			.subscribe({
				next: (res) => {
					this.router.navigate(['/user']);
				},
				error: (err) => {
					console.error(err.error.message);
				},
			});
	}
}
