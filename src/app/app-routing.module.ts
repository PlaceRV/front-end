import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuckComponent } from './pages/luck/luck.component';
import { FortuneComponent } from './pages/fortune/fortune.component';
import { FameComponent } from './pages/fame/fame.component';
import { UserComponent } from './pages/user/user.component';
import { NotFoundComponent } from './error/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'user',
	},
	{ path: 'luck', component: LuckComponent },
	{ path: 'fortune', component: FortuneComponent },
	{ path: 'fame', component: FameComponent },
	{ path: 'user', component: UserComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
