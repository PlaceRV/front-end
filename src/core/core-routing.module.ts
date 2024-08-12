import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AppComponent } from '../app/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LuckComponent } from '../app/pages/luck/luck.component';
import { FortuneComponent } from '../app/pages/fortune/fortune.component';
import { FameComponent } from '../app/pages/fame/fame.component';
import { UserComponent } from '../app/pages/user/user.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'prefix',
		component: AppComponent,
		children: [
			{ path: 'luck', component: LuckComponent },
			{ path: 'fortune', component: FortuneComponent },
			{ path: 'fame', component: FameComponent },
			{ path: 'user', component: UserComponent },
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
