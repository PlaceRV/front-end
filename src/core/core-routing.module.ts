import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AppComponent } from '../app/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LuckComponent } from 'pg/luck/luck.component';
import { FortuneComponent } from 'pg/fortune/fortune.component';
import { FameComponent } from 'pg/fame/fame.component';
import { UserComponent } from 'pg/user/user.component';
import { LoginComponent } from 'pg/user/login/login.component';
import { InfoComponent } from 'pg/user/info/info.component';
import { SignupComponent } from 'pg/user/signup/signup.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'prefix',
		component: AppComponent,
		children: [
			{ path: 'luck', component: LuckComponent },
			{ path: 'fortune', component: FortuneComponent },
			{ path: 'fame', component: FameComponent },
			{
				path: 'user',
				component: UserComponent,
				children: [
					{ path: '', pathMatch: 'full', component: InfoComponent },
					{ path: 'login', component: LoginComponent },
					{ path: 'signup', component: SignupComponent },
				],
			},
			{ path: '', pathMatch: 'full', redirectTo: 'user' },
		],
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class CoreRoutingModule {}
