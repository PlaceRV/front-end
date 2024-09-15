import { Component } from '@angular/core';

@Component({
	selector: 'cp-loading',
	template: `
		<div class="fr h-full w-full items-center justify-center">
			<span class="ds-loading ds-loading-spinner w-1/12 text-primary"></span>
		</div>
	`,
})
export class LoadingComponent {}
