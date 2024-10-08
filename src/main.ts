import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreModule } from './core/core.module';

platformBrowserDynamic()
	.bootstrapModule(CoreModule, { ngZoneEventCoalescing: true })
	.catch((err) => console.error(err));
