import { Component, Input, signal } from '@angular/core';
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
export class SidenavComponent {
	@Input({ required: false }) isCollapsed = signal(false);

	menuItems = signal<MenuItems[]>([
		{ icon: 'playing_cards', label: 'May mắn', route: 'luck' },
		{ icon: 'payments', label: 'Lộc tài', route: 'fortune' },
		{ icon: 'rewarded_ads', label: 'Công danh', route: 'fame' },
	]);
}
