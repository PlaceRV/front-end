import {
	Component,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
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

	private routerSubscription: Subscription = null;
	protected onLeaveUrl: Function = () => 0;
	protected router: Router;
	protected formBuilder?: FormBuilder;

	OnInit(): any {
		console.warn('Please initiate OnInit method at ' + this.constructor.name);
	}
	OnDestroy(): any {
		console.warn(
			'Please initiate OnDestroy method at ' + this.constructor.name,
		);
	}
	OnSubmit(): any {
		return;
	}

	form: FormGroup;
	properties: InputItem[];
	status = {
		pageLoaded: false,
		formProcessing: false,
		formSummited: false,
	};

	get controls() {
		if (this.form) return this.form.controls;
		return null;
	}

	initForm(i: InputItem[]) {
		this.form = this.formBuilder.group(AppService.formAssign(i));
	}

	ngOnInit(): void {
		if (this.router)
			this.routerSubscription = this.router.events.subscribe((event) => {
				if (event instanceof NavigationEnd) this.onLeaveUrl();
			});
		this.OnInit();
	}

	ngOnDestroy(): void {
		if (this.routerSubscription) this.routerSubscription.unsubscribe();
		this.OnDestroy();
	}

	get current() {
		return this;
	}
}
