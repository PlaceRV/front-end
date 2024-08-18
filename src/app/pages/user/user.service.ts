import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private apiUrl = (path?: string) =>
		`https://backend.anhvietnguyen.id.vn:2053/${path}`;
	constructor(private httpSvc: HttpClient) {}

	execute(
		type: 'signup' | 'login' | 'logout',
		body: any,
		next: (value: any) => void,
		error?: (error: any) => void
	) {
		this.httpSvc
			.post(this.apiUrl(`auth/${type}`), body, { withCredentials: true })
			.subscribe({ next, error });
	}

	get(next: (value: any) => void, error: (error: any) => void) {
		this.httpSvc
			.post(this.apiUrl('user'), null, { withCredentials: true })
			.subscribe({ next, error });
	}
}
