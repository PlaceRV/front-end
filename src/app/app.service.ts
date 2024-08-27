import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
	backendUrl(path = '') {
		return 'https://backend.anhvietnguyen.id.vn:2053' + path;
	}
}
