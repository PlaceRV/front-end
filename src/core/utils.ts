import { MapService } from 'cp/map/map.service';

export function clearMap(
	_target: any,
	propertyKey: any,
	descriptor: PropertyDescriptor,
) {
	const originalMethod = descriptor.value;
	descriptor.value = function (...args: any) {
		(this as MapService).clear();
		const result = originalMethod.apply(this, args);
		return result;
	};
	return descriptor;
}

export const dummyDecorator = (input?: object) =>
	function (target?: any, context?: string) {
		(() => input)();
		(() => target)();
		(() => context)();
	};
