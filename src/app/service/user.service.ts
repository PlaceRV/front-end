import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ILoginKeys,
	InterfaceCasting,
	ISignUpKeys,
	IUser,
	IUserAuthentication,
	IUserInfo,
} from 'place-review-types';
import { BehaviorSubject, Observer } from 'rxjs';
import { AlertService } from 'service/alert.service';
import { AppService } from 'service/app.service';

@Injectable({ providedIn: 'root' })
export class UserService extends BehaviorSubject<IUser> {
	private authUrl = (path?: string) => AppService.backendUrl(`/auth/${path}`);

	constructor(
		private httpSvc: HttpClient,
		private alrSvc: AlertService,
	) {
		super(null);
	}

	async execute(
		type: 'signup' | 'login' | 'logout',
		options?: {
			body?: IUserAuthentication & Partial<IUserInfo>;
			onNext?: (v: any) => void;
			onError?: (e: any) => void;
		},
	) {
		const { body, onError = () => 0, onNext = () => 0 } = options || {};

		this.httpSvc
			.post(
				this.authUrl(type),
				type === 'logout'
					? ''
					: new InterfaceCasting(
							body,
							type === 'signup' ? ISignUpKeys : ILoginKeys,
						),
				{ withCredentials: true },
			)
			.subscribe({
				next: (value) => {
					this.get();
					onNext(value);
				},
				error: (e: HttpErrorResponse) => {
					try {
						const errors = JSON.parse(e.error.message);
						for (const error in errors) this.alrSvc.error(errors[error]);
					} catch {
						this.alrSvc.error(e.error.message);
					}

					onError(e);
				},
			});
	}

	private get(options: { showError?: boolean } = {}) {
		const { showError = true } = options || {};
		this.httpSvc
			.post(AppService.backendUrl('/user'), null, { withCredentials: true })
			.subscribe({
				next: (val: object) => this.next(val as IUser),
				error: (e: HttpErrorResponse) => {
					if (showError) this.alrSvc.error(e.message);
				},
			});
	}

	required(
		func?: Partial<Observer<IUser>> | ((value: IUser) => void),
		options: { showError?: boolean } = {},
	) {
		if (!this.value) this.get(options);
		return this.subscribe(func);
	}
}
