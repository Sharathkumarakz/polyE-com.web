import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyWithoutSignupComponent } from './buy-without-signup.component';

describe('BuyWithoutSignupComponent', () => {
  let component: BuyWithoutSignupComponent;
  let fixture: ComponentFixture<BuyWithoutSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyWithoutSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyWithoutSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
