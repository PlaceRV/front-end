import { Component, Input, signal } from '@angular/core';
import { IUser, matching, Role } from 'place-review-types';
import { Subscription } from 'rxjs';
import { UserService } from 'service/user.service';
import { BaseComponent } from 'utils';

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

	constructor(private usrSvc: UserService) {
		super();

		this.OnInit = () => {
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
		};
		this.OnDestroy = () => {
			console.log('sidenav');
			this.userSubscription.unsubscribe();
		};
	}
}
