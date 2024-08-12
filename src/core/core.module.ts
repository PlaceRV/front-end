import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { AppComponent } from '../app/app.component';
import { SidenavComponent } from '../app/components/sidenav/sidenav.component';
import { MapComponent } from '../app/components/map/map.component';
// Angular's modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

@NgModule({
	declarations: [
		CoreComponent,
		AppComponent,
		SidenavComponent,
		MapComponent,
		FameComponent,
		LuckComponent,
		UserComponent,
		FortuneComponent,
		FameComponent,
	],
	imports: [
		BrowserModule,
		CoreRoutingModule,
		FormsModule,
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
