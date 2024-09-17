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
import { AppComponent } from 'app.component';
// Components
import { AlertModule } from 'components/alert/alert.module';
import { FormComponent } from 'components/form/form.component';
import { MapComponent } from 'components/map/map.component';
import { SidenavComponent } from 'components/sidenav/sidenav.component';
import { FameComponent } from 'page/fame/fame.component';
import { FortuneComponent } from 'page/fortune/fortune.component';
import { LuckComponent } from 'page/luck/luck.component';
// Pages
import { EditComponent } from 'page/map/edit/edit.component';
import { InfoComponent } from 'page/user/info/info.component';
import { LoginComponent } from 'page/user/login/login.component';
import { SignupComponent } from 'page/user/signup/signup.component';
import { AppService } from 'service/app.service';
import { BaseComponent } from '../utils';
// Core
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
		BaseComponent,
		FormComponent,
		// Pages
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
			deps: [HttpLink],
			provide: APOLLO_OPTIONS,
			useFactory(httpLink: HttpLink) {
				return {
					cache: new InMemoryCache(),
					link: httpLink.create({
						uri: AppService.backendUrl('/graphql'),
						withCredentials: true,
					}),
				};
			},
		},
	],
	bootstrap: [CoreComponent],
})
export class CoreModule {}
