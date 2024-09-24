import { Component } from '@angular/core';
import { toFormData } from 'components/form/form.component';
import { BaseComponent, InputItem } from 'utils';

@Component({ selector: 'pg-signup', templateUrl: './signup.component.html' })
export class SignupComponent extends BaseComponent {
	constructor() {
		super();

		this.OnInit = () =>
			this.usrSvc.execute('user', {
				onAny: ({ value }) => {
					if (!value) this.status.pageLoaded = true;
					else this.appSvc.nav('/user');
				},
				showError: false,
			});
		this.OnDestroy = () => console.log('signup');
		this.OnSubmit = () => {
			this.status.formSummited = true;
			if (this.form.invalid) return;

			const form = toFormData(this.form.value);
			for (const i of this.properties)
				if (i.type === 'file' && this.files[i.label]) {
					let key = i.label.replaceAll(/\s/g, '');
					key = key[0].toLocaleLowerCase() + key.slice(1);
					form.append(key, this.files[i.label], this.files[i.label].name);
				}

			this.status.formProcessing = true;
			this.usrSvc.execute('signup', {
				body: form,
				onNext: (value: any) => {
					if (value) this.appSvc.nav('/user');
				},
				onError: () => (this.status.formProcessing = false),
			});
		};

		this.properties = InputItem.many([
			{ label: 'Email' },
			{ label: 'First Name' },
			{ label: 'Last Name' },
			{ label: 'Password', type: 'password' },
			{ label: 'Avatar', type: 'file', required: false },
		]);
	}
}
