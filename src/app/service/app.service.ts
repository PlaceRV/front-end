import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputItem } from '../../utils';

@Injectable({ providedIn: 'root' })
export class AppService {
	constructor(private router: Router) {}

	static backendUrl(path = '') {
		return 'https://testback.anhvietnguyen.id.vn' + path;
	}

	nav(url: string) {
		this.router.navigate([url]);
	}

	static formAssign(input: InputItem[]) {
		return Object.assign(
			{},
			...input.map((v) => ({
				[v.label]: [
					v.defaultValue,
					v.required ? Validators.required : Validators.nullValidator,
				],
			})),
		);
	}
}
