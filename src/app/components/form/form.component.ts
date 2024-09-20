import { Component, Input } from '@angular/core';
import { BaseComponent } from 'utils';

@Component({ selector: 'cp-form', templateUrl: './form.component.html' })
export class FormComponent {
	@Input() parent: BaseComponent;
	@Input() title: string;
	@Input() submitButtonLabel?: string = 'Submit';
}
