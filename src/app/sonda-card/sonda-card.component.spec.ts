import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondaCardComponent } from './sonda-card.component';

describe('SondaCardComponent', () => {
  let component: SondaCardComponent;
  let fixture: ComponentFixture<SondaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
