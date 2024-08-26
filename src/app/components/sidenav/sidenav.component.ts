import { Component, Input, OnInit, signal } from '@angular/core';
import { isMatchRoles, Role, User } from '@backend/user/user.entity';
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
export class SidenavComponent implements OnInit {
	@Input({ required: false }) isCollapsed = signal(false);
	user: User;
	menuItems = signal<MenuItems[]>([]);

	constructor(private usrSvc: UserService) {}

	async ngOnInit() {
		this.usrSvc.subscribe((usr) => {
			this.user = usr;

			const appendRows: MenuItems[] = this.user
				? [
						...(isMatchRoles(this.user.roles, [Role.STAFF])
							? [{ icon: 'edit', label: 'Chỉnh sửa', route: 'edit' }]
							: []),
						...(isMatchRoles(this.user.roles, [Role.ADMIN])
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
}
