import {
	Component,
	HostBinding,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { Alert, AlertType } from './alert.model';

@Component({ selector: 'cp-alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
	@Input() id = 'default-alert';
	@Input() fade = true;
	@HostBinding('class') classes =
		'absolute w-full top-0 -translate-x-1/2 left-1/2 items-center fc z-10';

	alerts: Alert[] = [];
	alertSubscription!: Subscription;
	routeSubscription!: Subscription;

	constructor(
		private router: Router,
		private alertService: AlertService,
	) {}

	ngOnInit() {
		this.alertSubscription = this.alertService
			.onAlert(this.id)
			.subscribe((alert) => {
				if (!alert.message) {
					this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

					this.alerts.forEach((x) => delete x.keepAfterRouteChange);
					return;
				}

				this.alerts.push(alert);

				if (alert.autoClose) {
					setTimeout(() => this.removeAlert(alert), 6000);
				}
			});

		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.alertService.clear(this.id);
			}
		});
	}

	ngOnDestroy() {
		this.alertSubscription.unsubscribe();
		this.routeSubscription.unsubscribe();
	}

	removeAlert(alert: Alert) {
		if (!this.alerts.includes(alert)) return;

		const timeout = this.fade ? 250 : 0;
		alert.fade = this.fade;

		setTimeout(() => {
			this.alerts = this.alerts.filter((x) => x !== alert);
		}, timeout);
	}

	cssClass(alert: Alert) {
		const classes = ['ds-alert'];

		const alertTypeClass = {
			[AlertType.Success]: 'ds-alert-success',
			[AlertType.Error]: 'ds-alert-error',
			[AlertType.Info]: 'ds-alert-info',
			[AlertType.Warning]: 'ds-alert-warning',
		};

		if (alert.type !== undefined) {
			classes.push(alertTypeClass[alert.type]);
		}

		if (alert.fade) {
			classes.push('fade');
		}

		return classes.join(' ');
	}
}
