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
	async ngOnInit() {
		this.http
			.get(environment.backendUrl('/user'), {
				reportProgress: true,
				observe: 'events',
				withCredentials: true,
			})
			.subscribe({
				next: (res) => {
					res;
				},
				error: () => {
					this.router.navigate(['/user/login']);
				},
			});
	}
}
