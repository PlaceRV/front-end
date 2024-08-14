import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'pg-user-info',
	templateUrl: './info.component.html',
	styleUrl: './info.component.sass',
})
export class InfoComponent implements OnInit {
	constructor(private http: HttpClient, private router: Router) {}
	user: any = null;

	ngOnInit() {
		this.http
			.get(environment.backendUrl('/user'), {
				withCredentials: true,
			})
			.subscribe({
				next: (req: any) => {
					this.user = req;
				},
				error: () => {
					this.router.navigateByUrl('/user/login');
				},
				complete() {},
			});
	}

	logout() {
		this.http
			.post(
				environment.backendUrl('/auth/logout'),
				{},
				{ withCredentials: true }
			)
			.subscribe(() => {
				this.router.navigateByUrl('/user/login');
			});
	}
}
