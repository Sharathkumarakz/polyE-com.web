import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyProductComponent } from './track-my-product.component';

describe('TrackMyProductComponent', () => {
  let component: TrackMyProductComponent;
  let fixture: ComponentFixture<TrackMyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackMyProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackMyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
