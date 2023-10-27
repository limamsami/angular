import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSocieteComponent } from './create-societe.component';

describe('CreateSocieteComponent', () => {
  let component: CreateSocieteComponent;
  let fixture: ComponentFixture<CreateSocieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSocieteComponent]
    });
    fixture = TestBed.createComponent(CreateSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
