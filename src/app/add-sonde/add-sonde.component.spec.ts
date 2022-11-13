import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSondeComponent } from './add-sonde.component';

describe('AddSondeComponent', () => {
  let component: AddSondeComponent;
  let fixture: ComponentFixture<AddSondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSondeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
