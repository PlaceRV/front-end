import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { AppComponent } from '../app/app.component';
import { SidenavComponent } from '../app/components/sidenav/sidenav.component';
import { MapComponent } from '../app/components/map/map.component';
// Angular's modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
// materials' module
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FameComponent } from '../app/pages/fame/fame.component';
import { LuckComponent } from '../app/pages/luck/luck.component';
import { UserComponent } from '../app/pages/user/user.component';
import { FortuneComponent } from '../app/pages/fortune/fortune.component';
import { LoginComponent } from '../app/pages/user/login/login.component';
import { CommonModule } from '@angular/common';
import { InfoComponent } from 'src/app/pages/user/info/info.component';

@NgModule({
	declarations: [
		// Components
		CoreComponent,
		AppComponent,
		SidenavComponent,
		MapComponent,
		FameComponent,
		LuckComponent,
		UserComponent,
		FortuneComponent,
		FameComponent,
		LoginComponent,
		InfoComponent,
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
