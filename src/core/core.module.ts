import { CoreRoutingModule } from './core-routing.module';
// Components
import { CoreComponent } from './core.component';
import { AppComponent } from '../app/app.component';
import { SidenavComponent } from 'cp/sidenav/sidenav.component';
import { MapComponent } from 'cp/map/map.component';
import { LoadingComponent } from 'cp/loading/loading.component';
// Pages
import { LoginComponent } from 'pg/user/login/login.component';
import { SignupComponent } from 'pg/user/signup/signup.component';
import { LuckComponent } from 'pg/luck/luck.component';
import { InfoComponent } from 'pg/user/info/info.component';
import { FameComponent } from 'pg/fame/fame.component';
import { UserComponent } from 'pg/user/user.component';
import { FortuneComponent } from 'pg/fortune/fortune.component';
// Angular's modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// materials' module
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditComponent } from 'pg/edit/edit.component';

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
		UserComponent,
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
