// Angular's modules
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
// Components
import { AlertModule } from 'cp/alert/alert.module';
import { LoadingComponent } from 'cp/loading/loading.component';
import { MapComponent } from 'cp/map/map.component';
import { SidenavComponent } from 'cp/sidenav/sidenav.component';
// Pages
import { EditComponent } from 'pg/edit/edit.component';
import { FameComponent } from 'pg/fame/fame.component';
import { FortuneComponent } from 'pg/fortune/fortune.component';
import { LuckComponent } from 'pg/luck/luck.component';
import { InfoComponent } from 'pg/user/info/info.component';
import { LoginComponent } from 'pg/user/login/login.component';
import { SignupComponent } from 'pg/user/signup/signup.component';
// Core
import { AppComponent } from '../app/app.component';
import { AppService } from '../app/app.service';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

@NgModule({
	declarations: [
		// Components
		CoreComponent,
		AppComponent,
		// Untils
		SidenavComponent,
		MapComponent,
		LoadingComponent,
		// pg
		FameComponent,
		LuckComponent,
		FortuneComponent,
		FameComponent,
		// User
		LoginComponent,
		SignupComponent,
		InfoComponent,
		// Editor
		EditComponent,
	],
	imports: [
		BrowserModule,
		ApolloModule,
		CoreRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		AlertModule,
		// Materials
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
	],
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(),
		{
			provide: APOLLO_OPTIONS,
			useFactory(httpLink: HttpLink, appSvc: AppService) {
				return {
					cache: new InMemoryCache(),
					link: httpLink.create({ uri: appSvc.backendUrl('/graphql') }),
				};
			},
		},
	],
	bootstrap: [CoreComponent],
})
export class CoreModule {}
