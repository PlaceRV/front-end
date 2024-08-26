import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from 'pg/edit/edit.component';
import { FameComponent } from 'pg/fame/fame.component';
import { FortuneComponent } from 'pg/fortune/fortune.component';
import { LuckComponent } from 'pg/luck/luck.component';
import { InfoComponent } from 'pg/user/info/info.component';
import { LoginComponent } from 'pg/user/login/login.component';
import { SignupComponent } from 'pg/user/signup/signup.component';
// Components
import { AppComponent } from '../app/app.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'prefix',
		component: AppComponent,
		children: [
			{ path: 'luck', component: LuckComponent },
			{ path: 'fortune', component: FortuneComponent },
			{ path: 'fame', component: FameComponent },
			{ path: 'edit', component: EditComponent },
			{
				path: 'user',
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
