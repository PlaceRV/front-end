import { Component, Injectable, OnInit } from '@angular/core';

@Component({
	selector: 'pg-user',
	template: '<router-outlet/>',
})
@Injectable({ providedIn: 'root' })
export class UserComponent implements OnInit {
	ngOnInit(): void {
		
	}
}
