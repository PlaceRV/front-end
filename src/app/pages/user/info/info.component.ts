import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
	selector: 'pg-user-info',
	templateUrl: './info.component.html',
	styleUrl: './info.component.sass',
})
export class InfoComponent implements OnInit {
	constructor(private usrSvc: UserService, private router: Router) {}
	user: any = null;

	ngOnInit() {
		this.usrSvc.get(
			(req: any) => (this.user = req),
			() => this.router.navigateByUrl('/user/login')
		);
	}

	logout() {
		this.usrSvc.execute('logout', null, () => {
			this.router.navigateByUrl('/user/login');
		});
	}
}
