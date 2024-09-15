export const dummyDecorator = (input?: object) =>
	function (target?: any, context?: string) {
		(() => input)();
		(() => target)();
		(() => context)();
	};

export class InputItem {
	constructor(payload: Partial<InputItem>) {
		Object.assign(this, payload);
	}

	label: string;
	required = true;
	readonly = false;
	defaultValue = '';
	type: 'text' | 'password' = 'text';
}
