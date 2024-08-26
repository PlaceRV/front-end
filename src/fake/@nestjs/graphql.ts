import { dummyDecorator } from 'utils';

export function ObjectType() {
	return dummyDecorator();
}

export function Field(input?: () => any) {
	return dummyDecorator({ input });
}
