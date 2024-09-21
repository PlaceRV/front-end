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
		type: 'signup' | 'login' | 'logout' | 'refresh' | 'user' | 'subscribe',
		options: {
			body?: IUserAuthentication & Partial<IUserInfo>;
			onNext?: (re?: { value: any; t?: UserService }) => void;
			onError?: (re?: { error: any; t?: UserService }) => void;
			onAny?: (re?: { value: any; t?: UserService }) => void;
			showError?: boolean;
			allowRefresh?: boolean;
		} = {},
	): Promise<boolean> {
		const {
			body,
			onError = () => 0,
			onNext = () => 0,
			onAny = () => 0,
			showError = true,
			allowRefresh = true,
		} = options || {};

		if (type === 'subscribe') {
			onAny({ value: null, t: this });
			return true;
		} else
			return new Promise((resolve) => {
				this.httpSvc
					.post(
						type === 'user'
							? AppService.backendUrl('/user')
							: this.authUrl(type),
						['refresh', 'logout', 'user'].includes(type)
							? ''
							: new InterfaceCasting(
									body,
									type === 'signup' ? ISignUpKeys : ILoginKeys,
								),
						{ withCredentials: true },
					)
					.subscribe({
						next: async (value) => {
							if (type !== 'refresh') {
								onNext({ value, t: this });
								onAny({ value, t: this });
							}

							if (type === 'logout') this.next(null);
							else if (type === 'refresh') await this.execute('user', options);
							else if (type === 'user') this.next(value as IUser);

							resolve(true);
						},
						error: async ({ error }: HttpErrorResponse) => {
							if (type !== 'refresh') {
								if (allowRefresh && (await this.execute('refresh')))
									resolve(await this.execute(type, options));
								else {
									if (showError)
										try {
											const errors = JSON.parse(error.message);
											for (const error in errors)
												this.alrSvc.error(errors[error]);
										} catch {
											this.alrSvc.error(error.message);
										}

									onError({ error });
									onAny({ value: null, t: this });
								}
							}
							resolve(false);
						},
					});
			});
	}
}
