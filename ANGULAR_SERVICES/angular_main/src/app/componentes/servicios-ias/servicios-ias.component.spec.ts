import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosIasComponent } from './servicios-ias.component';

describe('ServiciosIasComponent', () => {
  let component: ServiciosIasComponent;
  let fixture: ComponentFixture<ServiciosIasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosIasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosIasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
