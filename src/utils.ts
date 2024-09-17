import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
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

@Component({
	template: `
		<div class="fr h-full w-full items-center justify-center">
			<span class="ds-loading ds-loading-spinner w-1/12 text-primary"></span>
		</div>
	`,
	selector: 'baseCp'

})
export class BaseComponent implements OnInit, OnDestroy {
	@HostBinding('class') classes = 'h-full'

	private routerSubscription: Subscription;
	protected router: Router;
	protected onLeaveUrl: Function;
	protected formBuilder?: FormBuilder;

	form!: FormGroup;
	status = {
		pageLoaded: false,
		formProcessing: false,
		formSummited: false,
	};

	private Err(name: string) {
		return new Error(name + ' must be initiated in ' + this.constructor.name);
	}

	private check(objects: string[]) {
		objects.forEach((i) => {
			if (!this[i]) throw this.Err(i);
		});
	}

	get controls() {
		return this.form.controls;
	}

	initForm(i: InputItem[]) {
		this.form = this.formBuilder.group(AppService.formAssign(i));
	}

	ngOnInit(): void {
		this.check(['formBuilder', 'router', 'onLeaveUrl']);
		this.routerSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) this.onLeaveUrl();
		});
	}

	ngOnDestroy(): void {
		if (this.routerSubscription) this.routerSubscription.unsubscribe();
	}
}
