import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
	backendUrl(path = '') {
		return 'https://testback.anhvietnguyen.id.vn' + path;
	}
}
