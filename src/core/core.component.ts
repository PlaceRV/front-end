import { Component, OnInit } from '@angular/core';
import { UserService } from 'pg/user/user.service';

@Component({ selector: 'core', template: '<router-outlet/>' })
export class CoreComponent implements OnInit {
	constructor(private usrSvc: UserService) {}

	async ngOnInit() {
		await this.usrSvc.required();
	}
}
