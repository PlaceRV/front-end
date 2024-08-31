import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@backend/user/user.interface';
import { UserService } from '../user.service';

@Component({
	selector: 'pg-user-info',
	templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
	constructor(
		private usrSvc: UserService,
		private router: Router,
	) {}
	user: IUser;

	async ngOnInit() {
		this.usrSvc.required((usr) => {
			this.user = usr;
			if (!usr) this.router.navigateByUrl('/user/login');
		});
	}

	logout() {
		this.usrSvc.execute('logout', null, () => {
			this.router.navigateByUrl('/user/login');
		});
	}
}
