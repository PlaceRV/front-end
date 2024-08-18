import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FameComponent } from './fame.component';

describe('FameComponent', () => {
	let component: FameComponent;
	let fixture: ComponentFixture<FameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FameComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
