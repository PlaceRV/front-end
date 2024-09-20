import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FameComponent } from 'page/fame/fame.component';
import { FortuneComponent } from 'page/fortune/fortune.component';
import { LuckComponent } from 'page/luck/luck.component';
// Pages
import { EditComponent } from 'page/map/edit/edit.component';
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
			{ path: 'map', children: [{ path: 'edit', component: EditComponent }] },
			{
				path: 'user',
				children: [
					{ path: 'info', component: InfoComponent },
					{ path: 'login', component: LoginComponent },
					{ path: 'signup', component: SignupComponent },
				],
			},
			{ path: '', pathMatch: 'full', redirectTo: 'user/info' },
		],
	},
	{ path: '**', component: NotFoundComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class CoreRoutingModule {}
