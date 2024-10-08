export class Alert {
	id?: string;
	type?: AlertType;
	message?: string;
	autoClose?: boolean = true;
	keepAfterRouteChange?: boolean;
	fade?: boolean = true;

	constructor(init?: Partial<Alert>) {
		Object.assign(this, init);
	}
}

export enum AlertType {
	Success,
	Error,
	Info,
	Warning,
}

export class AlertOptions {
	id?: string;
	autoClose?: boolean;
	keepAfterRouteChange?: boolean;
}
