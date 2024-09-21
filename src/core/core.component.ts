import { Component } from '@angular/core';
import { UserService } from 'service/user.service';

@Component({ selector: 'core', template: '<router-outlet/>' })
export class CoreComponent {
	constructor(private usrSvc: UserService) {}
}
