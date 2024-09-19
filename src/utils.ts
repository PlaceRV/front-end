import {
	Component,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { allImplement, logMethodCall } from 'place-review-types';
import { BehaviorSubject, Subscription } from 'rxjs';
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

interface PageStatus {
	status: {
		pageLoaded: boolean;
		formProcessing: boolean;
		formSummited: boolean;
	};
}

function override(container, key, other1) {
	const baseType = Object.getPrototypeOf(container);
	if (typeof baseType[key] !== 'function') {
		throw new Error(
			'Method ' +
				key +
				' of ' +
				container.constructor.name +
				' does not override any base class method',
		);
	}
}

@allImplement(logMethodCall)
@Component({
	template: `
		<div class="fr h-full w-full items-center justify-center">
			<span class="ds-loading ds-loading-spinner w-1/12 text-primary"></span>
		</div>
		<ng-content [parent]="current" />
	`,
	selector: 'baseCp',
})
export class BaseComponent implements OnInit, OnDestroy, PageStatus {
	@HostBinding('class') classes = 'h-full';
	@Input() parent: BaseComponent;

	private routerSubscription: Subscription;
	protected onLeaveUrl: Function = () => 0;
	protected router: Router;
	protected formBuilder?: FormBuilder;

	form: FormGroup;
	properties: InputItem[];
	status = {
		pageLoaded: false,
		formProcessing: false,
		formSummited: false,
	};

	get controls() {
		if (this.constructor.name === '_BaseComponent' || !this.constructor.name)
			return null;
		if (!this.form) throw new Error('Must run initForm before get controls');
		return this.form.controls;
	}

	initForm(i: InputItem[]) {
		this.form = this.formBuilder.group(AppService.formAssign(i));
	}

	ngOnInit(): void {
		if (this.constructor.name === '_BaseComponent') return;
		this.routerSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) this.onLeaveUrl();
		});
	}

	ngOnDestroy(): void {
		if (this.routerSubscription) this.routerSubscription.unsubscribe();
	}

	onSubmit() {
		return;
	}

	get current() {
		return this;
	}
}
