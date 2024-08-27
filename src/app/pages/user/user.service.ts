import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@backend/user/user.entity';
import { BehaviorSubject, Observer } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({
	providedIn: 'root',
})
export class UserService extends BehaviorSubject<User> {
	private authUrl = (path?: string) =>
		`${this.appSvc.backendUrl()}/auth/${path}`;

	constructor(
		private httpSvc: HttpClient,
		private appSvc: AppService,
	) {
		super(null);
	}

	async execute(
		type: 'signup' | 'login' | 'logout',
		body: any,
		next: (value: any) => void,
		error?: (error: any) => void,
	) {
		this.httpSvc
			.post(this.authUrl(type), body, { withCredentials: true })
			.subscribe({
				next: async (value) => {
					this.next(await this.get());
					next(value);
				},
				error,
			});
	}

	private get() {
		return new Promise<User>((resolve) => {
			this.httpSvc
				.post(this.appSvc.backendUrl('/user'), null, { withCredentials: true })
				.subscribe({
					next: (val: object) =>
						resolve(new User(val as Required<typeof User.prototype.info>)),
					error: () => resolve(null),
				});
		});
	}

	async required(func?: Partial<Observer<User>> | ((value: User) => void)) {
		if (!this.value) this.next(await this.get());
		this.subscribe(func);
	}
}
