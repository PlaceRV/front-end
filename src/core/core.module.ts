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
import { AlertModule } from 'cp/alert/alert.module';
// Components
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
import { AppComponent } from '../app/app.component';
// Core
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { GraphQLModule } from './graphql.module';

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
		CoreRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		GraphQLModule,
		// Core's modules
		AlertModule,
		// Materials
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
	],
	providers: [provideAnimationsAsync(), provideHttpClient()],
	bootstrap: [CoreComponent],
})
export class CoreModule {}
