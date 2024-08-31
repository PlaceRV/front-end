import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { matchingRoles, Role } from '@backend/user/user.enum';
import { IUser } from '@backend/user/user.interface';
import { UserService } from 'pg/user/user.service';

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
export class SidenavComponent implements OnInit, OnDestroy {
	@Input({ required: false }) isCollapsed = signal(false);
	user: IUser;
	menuItems = signal<MenuItems[]>([]);

	constructor(private usrSvc: UserService) {}

	async ngOnInit() {
		this.usrSvc.subscribe((usr) => {
			this.user = usr;

			const appendRows: MenuItems[] = this.user
				? [
						...(matchingRoles(this.user.roles, [Role.STAFF])
							? [{ icon: 'edit', label: 'Chỉnh sửa', route: 'edit' }]
							: []),
						...(matchingRoles(this.user.roles, [Role.ADMIN])
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

	async ngOnDestroy() {
		this.usrSvc.unsubscribe();
	}
}
