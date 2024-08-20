import { Component, Injectable } from '@angular/core';

@Component({
	selector: 'pg-user',
	template: '<router-outlet/>',
})
@Injectable({ providedIn: 'root' })
export class UserComponent {}
