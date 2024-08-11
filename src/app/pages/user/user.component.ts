import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'pg-user',
	templateUrl: './user.component.html',
	styleUrl: './user.component.sass',
})
@Injectable({ providedIn: 'root' })
export class UserComponent {
	constructor(private httpSvc: HttpClient) {}
	user = {
		email: null,
		password: null,
	};

	onSubmit(user: any) {
		this.httpSvc
			.post(
				'http://backend.anhvietnguyen.id.vn/auth/login',
				{
					email: user.email,
					password: user.password,
				},
				{ reportProgress: true, observe: 'events', withCredentials: true }
			)
			.subscribe((res) => {
				console.log('Response status:', res);
				console.log('Body:', res.type);
			});
	}
}
