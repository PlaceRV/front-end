import { InitClass } from '@backend/utils';

export const dummyDecorator = (input?: object) =>
	function (target?: any, context?: string) {
		(() => input)();
		(() => target)();
		(() => context)();
	};

export class InputItem {
	constructor(payload: InitClass<Partial<InputItem>>) {
		for (const key in payload as any) this[key] = payload[key];
	}
	label: string;
	required = true;
	readonly = false;
	defaultValue = '';
	type: "text" | "password" = "text";
}
