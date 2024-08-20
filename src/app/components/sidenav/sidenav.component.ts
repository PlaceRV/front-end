import { Component, Input, OnInit, signal } from '@angular/core';
import { User } from 'backend/user/user.entity';
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
	menuItems = signal<MenuItems[]>([
		{ icon: 'playing_cards', label: 'May mắn', route: 'luck' },
		{ icon: 'payments', label: 'Lộc tài', route: 'fortune' },
		{ icon: 'rewarded_ads', label: 'Công danh', route: 'fame' },
	]);

	constructor(private usrSvc: UserService) {}

	async ngOnInit() {
		this.usrSvc.currentUser.subscribe((usr) => (this.user = usr));
	}
}
