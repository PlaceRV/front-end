import { Component, Input, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, matching, Role } from 'place-review-types';
import { Subscription } from 'rxjs';
import { UserService } from 'service/user.service';
import { BaseComponent } from '../../../utils';

export interface MenuItems {
	icon: string;
	label: string;
	route?: string;
}

@Component({
	selector: 'cp-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.sass',
})
export class SidenavComponent extends BaseComponent {
	@Input({ required: false }) isCollapsed = signal(false);
	user: IUser;
	private userSubscription: Subscription;
	menuItems = signal<MenuItems[]>([]);

	constructor(
		private usrSvc: UserService,
		protected router: Router,
		protected formBuilder: FormBuilder,
	) {
		super();
		this.onLeaveUrl = () => {
			console.log('sidenav');
		};
	}

	async OnInit() {
		this.userSubscription = this.usrSvc.subscribe((usr) => {
			this.user = usr;

			const appendRows: MenuItems[] = this.user
				? [
						...(matching(this.user.roles, [Role.STAFF])
							? [{ icon: 'edit', label: 'Chỉnh sửa', route: '/map/edit' }]
							: []),
						...(matching(this.user.roles, [Role.ADMIN])
							? [
									{
										icon: 'delete_forever',
										label: 'Xóa trang',
										route: 'deletePage',
									},
								]
							: []),
					]
				: [];

			this.menuItems.set([
				...[
					{ icon: 'playing_cards', label: 'May mắn', route: 'luck' },
					{ icon: 'payments', label: 'Lộc tài', route: 'fortune' },
					{ icon: 'rewarded_ads', label: 'Công danh', route: 'fame' },
				],
				...appendRows,
			]);
		});
	}

	async OnDestroy() {
		this.userSubscription.unsubscribe();
	}
}
