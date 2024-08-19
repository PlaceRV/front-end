/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { dummyDecorator } from 'utils';

export function Column(i1?: string | object, i2?: object) {
	return dummyDecorator({ i1, i2 });
}

export function PrimaryGeneratedColumn(i1: string) {
	return dummyDecorator({ i1 });
}

export function OneToMany(i1: any, i2: any) {
	return dummyDecorator({ i1, i2 });
}

export function ManyToOne(i1: any, i2: any) {
	return dummyDecorator({ i1, i2 });
}

export function Entity() {
	return dummyDecorator();
}

export function JoinColumn(i1: any) {
	return dummyDecorator({ i1 });
}

export class BaseEntity {}
