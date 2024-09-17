import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'components/alert/alert.service';
import {
	ILoginKeys,
	InterfaceCasting,
	ISignUpKeys,
	IUser,
	IUserAuthentication,
	IUserInfo,
} from 'place-review-types';
import { BehaviorSubject, Observer } from 'rxjs';
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
		this.httpSvc
			.post(
				this.authUrl(type),
				type === 'logout'
					? ''
					: new InterfaceCasting(
							options.body!,
							type === 'signup' ? ISignUpKeys : ILoginKeys,
						),
				{ withCredentials: true },
			)
			.subscribe({
				next: async (value) => {
					this.next(await this.get());
					options.onNext!(value);
				},
				error: (e: HttpErrorResponse) => {
					const errors = JSON.parse(e.error.message);
					for (const error in errors) this.alrSvc.error(errors[error]);

					options.onError!(e);
				},
			});
	}

	private get({ showError = true }: { showError?: boolean } = {}) {
		return new Promise<IUser>((resolve) => {
			this.httpSvc
				.post(AppService.backendUrl('/user'), null, { withCredentials: true })
				.subscribe({
					next: (val: object) => resolve(val as IUser),
					error: (e: HttpErrorResponse) => {
						if (showError) this.alrSvc.error(e.message);
						resolve(null);
					},
				});
		});
	}

	async required(
		func?: Partial<Observer<IUser>> | ((value: IUser) => void),
		{ showError = true }: { showError?: boolean } = {},
	) {
		if (!this.value) this.next(await this.get({ showError }));
		this.subscribe(func);
	}
}
