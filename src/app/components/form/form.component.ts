import { Component, Input } from '@angular/core';
import { BaseComponent } from 'utils';

@Component({
	selector: 'cp-form',
	templateUrl: './form.component.html',
})
export class FormComponent {
	@Input() parent: BaseComponent;
	@Input() title: string;
	@Input() submitButtonLabel?: string = 'Submit';
}

export function toFormData<T>(formValue: T) {
	const formData = new FormData();

	for (let key of Object.keys(formValue)) {
		const value = formValue[key];
		key = key.replaceAll(/\s/g, '');
		key = key[0].toLocaleLowerCase() + key.slice(1);
		formData.append(key, value);
	}

	return formData;
}
