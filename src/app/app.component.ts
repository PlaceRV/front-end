import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
	constructor(
		private matIconReg: MatIconRegistry,
		private observer: BreakpointObserver,
	) {}

	isMobile = true;
	isCollapsed = signal(false);
	menuIcon = computed(() =>
		this.isCollapsed() ? 'temple_buddhist' : 'arrow_back_ios',
	);

	toggleMenu() {
		this.isCollapsed.set(!this.isCollapsed());
	}

	ngOnInit(): void {
		this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');

		this.observer.observe(['(max-width: 1000px)']).subscribe((screenSize) => {
			if (screenSize.matches) {
				this.isMobile = true;
			} else {
				this.isMobile = false;
			}
		});
	}
}
