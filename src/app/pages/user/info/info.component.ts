import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'backend/user/user.entity';

@Component({
	selector: 'pg-user-info',
	templateUrl: './info.component.html',
	styleUrl: './info.component.sass',
})
export class InfoComponent implements OnInit {
	constructor(
		private usrSvc: UserService,
		private router: Router,
	) {}
	user: User;

	async ngOnInit() {
		(
			await this.usrSvc.get(() => this.router.navigateByUrl('/user/login'))
		).subscribe((usr) => (this.user = usr));
	}

	logout() {
		this.usrSvc.execute('logout', null, () => {
			this.router.navigateByUrl('/user/login');
		});
	}
}
