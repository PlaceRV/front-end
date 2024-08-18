import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
	selector: 'pg-user-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private usrSvc: UserService,
	) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	get f() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) return;

		this.loading = true;
		this.usrSvc.execute(
			'login',
			{
				email: this.f['email'].value,
				password: this.f['password'].value,
			},
			(req: any) => {
				if (req.success) this.router.navigateByUrl('/user');
			},
			(err) => {
				console.error(err.error.message);
				this.loading = false;
			},
		);
	}
}
