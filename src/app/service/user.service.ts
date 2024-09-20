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
		type: 'signup' | 'login' | 'logout' | 'refresh',
		options: {
			body?: IUserAuthentication & Partial<IUserInfo>;
			onNext?: Function;
			onError?: Function;
			onSubscribe?: Partial<Observer<IUser>> | ((value: IUser) => void);
			showError?: boolean;
		} = {},
	) {
		const {
			body,
			onError = () => 0,
			onNext = () => 0,
			onSubscribe = null,
			showError = true,
		} = options || {};

		return new Promise((resolve) =>
			this.httpSvc
				.post(
					this.authUrl(type),
					['refresh', 'logout'].includes(type)
						? ''
						: new InterfaceCasting(
								body,
								type === 'signup' ? ISignUpKeys : ILoginKeys,
							),
					{ withCredentials: true },
				)
				.subscribe({
					next: (v) => {
						onNext(v);
						resolve(this.subscribe(onSubscribe));
						if (type === 'logout') this.next(null);
						else if (type === 'refresh') this.get();
					},
					error: (e: HttpErrorResponse) => {
						if (showError && type !== 'refresh')
							try {
								const errors = JSON.parse(e.error.message);
								for (const error in errors) this.alrSvc.error(errors[error]);
							} catch {
								this.alrSvc.error(e.error.message);
							}
						onError(e);
						resolve(this.subscribe(onSubscribe));
					},
				}),
		);
	}

	private get(
		options: {
			showError?: boolean;
			onSubscribe?: Partial<Observer<IUser>> | ((value: IUser) => void);
		} = {},
	) {
		const { showError = true, onSubscribe = () => 0 } = options;
		return new Promise((resolve) =>
			this.httpSvc
				.post(AppService.backendUrl('/user'), null, { withCredentials: true })
				.subscribe({
					next: (val: object) => {
						this.next(val as IUser);
						resolve(this.subscribe(onSubscribe));
					},
					error: (e: HttpErrorResponse) => {
						if (showError) this.alrSvc.error(e.message);
						resolve(this.execute('refresh', options));
					},
				}),
		);
	}

	async required(
		options: {
			showError?: boolean;
			onSubscribe?: Partial<Observer<IUser>> | ((value: IUser) => void);
		} = {},
	) {
		return await this.get(options);
	}
}
