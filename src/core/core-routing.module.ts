import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { EditComponent } from 'page/edit/edit.component';
import { FameComponent } from 'page/fame/fame.component';
import { FortuneComponent } from 'page/fortune/fortune.component';
import { LuckComponent } from 'page/luck/luck.component';
import { InfoComponent } from 'page/user/info/info.component';
import { LoginComponent } from 'page/user/login/login.component';
import { SignupComponent } from 'page/user/signup/signup.component';
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
	{ path: '**', component: NotFoundComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class CoreRoutingModule {}
