import {
	Component,
	HostBinding,
	inject,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'service/app.service';

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

	static many(inputs: Partial<InputItem>[]) {
		return inputs.map((i) => new InputItem(i));
	}
}

export class Subject<T> extends BehaviorSubject<T> {
	constructor(i: T) {
		super(i);
	}

	set(i: Partial<T>) {
		this.next({ ...this.value, ...i });
	}
}

interface PageRequirements {
	status: {
		pageLoaded: boolean;
		formProcessing: boolean;
		formSummited: boolean;
	};
	OnInit: () => void;
	OnDestroy: () => void;
}

@Component({
	template: `
		<div class="fr h-full w-full items-center justify-center">
			<span class="ds-loading ds-loading-spinner w-1/12 text-primary"></span>
		</div>
		<ng-content [parent]="current" />
	`,
	selector: 'baseCp',
})
export class BaseComponent implements OnInit, OnDestroy, PageRequirements {
	@HostBinding('class') classes = 'h-full';
	@Input() parent: BaseComponent;

	protected formBuilder = inject(FormBuilder);

	OnInit(): any {
		console.warn('Please initiate OnInit method at ' + this.constructor.name);
	}
	OnDestroy(): any {
		console.warn(
			'Please initiate OnDestroy method at ' + this.constructor.name,
		);
	}
	OnSubmit(): any {
		console.warn('Please initiate OnSubmit method at ' + this.constructor.name);
	}

	_form: FormGroup;
	properties: InputItem[];
	status = {
		pageLoaded: false,
		formProcessing: false,
		formSummited: false,
	};

	get form() {
		if (!this._form) this.initForm();
		return this._form;
	}

	get controls() {
		return this.form.controls;
	}

	get current() {
		return this;
	}

	private initForm() {
		this._form = this.formBuilder.group(AppService.formAssign(this.properties));
	}

	ngOnInit() {
		this.OnInit();
	}

	ngOnDestroy() {
		this.OnDestroy();
	}
}
