import { CommonModule } from '@angular/common';
import { Component, Input, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

export type MenuItems = {
	icon: string;
	label: string;
	route?: string;
};

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [
		MatListModule,
		MatIconModule,
		CommonModule,
		UserComponent,
		RouterModule,
		MatButtonModule,
	],
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

	ngOnInit() {

	}
}
