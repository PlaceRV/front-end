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
import { BehaviorSubject } from 'rxjs';
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
		type: 'signup' | 'login' | 'logout' | 'refresh' | 'user',
		options: {
			body?: IUserAuthentication & Partial<IUserInfo>;
			onNext?: Function;
			onError?: Function;
			onAny?: Function;
			showError?: boolean;
		} = {},
	): Promise<boolean> {
		const {
			body,
			onError = () => 0,
			onNext = () => 0,
			onAny = () => 0,
			showError = true,
		} = options || {};

		return new Promise((resolve) => {
			this.httpSvc
				.post(
					type === 'user' ? AppService.backendUrl('/user') : this.authUrl(type),
					['refresh', 'logout', 'user'].includes(type)
						? ''
						: new InterfaceCasting(
								body,
								type === 'signup' ? ISignUpKeys : ILoginKeys,
							),
					{ withCredentials: true },
				)
				.subscribe({
					next: (v) => {
						if (type !== 'refresh') {
							onNext(v);
							onAny(v);
						}

						if (type === 'logout') this.next(null);
						else if (type === 'refresh') this.execute('user', options);
						else if (type === 'user') this.next(v as IUser);

						resolve(true);
					},
					error: async (e: HttpErrorResponse) => {
						if (type !== 'refresh') {
							if (await this.execute('refresh'))
								resolve(await this.execute(type, options));
							else {
								if (showError)
									try {
										const errors = JSON.parse(e.error.message);
										for (const error in errors)
											this.alrSvc.error(errors[error]);
									} catch {
										this.alrSvc.error(e.error.message);
									}

								onError(e);
								onAny(null);

								resolve(false);
							}
						}
					},
				});
		});
	}
}
