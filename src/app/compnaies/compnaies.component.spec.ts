import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnaiesComponent } from './compnaies.component';

describe('CompnaiesComponent', () => {
  let component: CompnaiesComponent;
  let fixture: ComponentFixture<CompnaiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompnaiesComponent]
    });
    fixture = TestBed.createComponent(CompnaiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
