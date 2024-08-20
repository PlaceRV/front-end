import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@backend/user/user.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private apiUrl = (path?: string) =>
		`https://backend.anhvietnguyen.id.vn:2053/${path}`;
	private _user = new BehaviorSubject<User>(null);
	currentUser = this._user.asObservable();

	constructor(private httpSvc: HttpClient) {}

	execute(
		type: 'signup' | 'login' | 'logout',
		body: any,
		next: (value: any) => void,
		error?: (error: any) => void,
	) {
		this.httpSvc
			.post(this.apiUrl(`auth/${type}`), body, { withCredentials: true })
			.subscribe({ next, error });
		if (type === 'logout') this._user.next(null);
	}

	private _get(): Promise<User> {
		return new Promise((resolve, reject) => {
			this.httpSvc
				.post(this.apiUrl('user'), null, { withCredentials: true })
				.subscribe({
					next: (val: object) => {
						resolve(new User(val as Required<typeof User.prototype.info>));
					},
					error: reject,
				});
		});
	}

	async get(error: (err?: any) => void = () => null) {
		try {
			if (!this._user.value) this._user.next(await this._get());
		} catch (err) {
			error(err);
		}
		return this.currentUser;
	}
}
