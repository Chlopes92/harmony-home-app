import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyWishlistComponent } from './empty-wishlist.component';

describe('EmptyWishlistComponent', () => {
  let component: EmptyWishlistComponent;
  let fixture: ComponentFixture<EmptyWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyWishlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
