import { Component, OnInit } from '@angular/core';
import { UserService } from 'service/user.service';

@Component({ selector: 'core', template: '<router-outlet/>' })
export class CoreComponent implements OnInit {
	constructor(private usrSvc: UserService) {}

	async ngOnInit() {
		this.usrSvc.required(() => 0, { showError: false });
	}
}
