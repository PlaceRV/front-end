import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'place-review-backend';
import { BehaviorSubject, Observer } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BehaviorSubject<IUser> {
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
		return new Promise<IUser>((resolve) => {
			this.httpSvc
				.post(this.appSvc.backendUrl('/user'), null, { withCredentials: true })
				.subscribe({
					next: (val: object) => resolve(val as IUser),
					error: () => resolve(null),
				});
		});
	}

	async required(func?: Partial<Observer<IUser>> | ((value: IUser) => void)) {
		if (!this.value) this.next(await this.get());
		this.subscribe(func);
	}
}
