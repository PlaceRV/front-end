import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckComponent } from './luck.component';

describe('LuckComponent', () => {
	let component: LuckComponent;
	let fixture: ComponentFixture<LuckComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LuckComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LuckComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
