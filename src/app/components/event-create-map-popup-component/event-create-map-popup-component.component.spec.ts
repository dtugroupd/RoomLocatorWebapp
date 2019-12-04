import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateMapPopupComponentComponent } from './event-create-map-popup-component.component';

describe('EventCreateMapPopupComponentComponent', () => {
  let component: EventCreateMapPopupComponentComponent;
  let fixture: ComponentFixture<EventCreateMapPopupComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreateMapPopupComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateMapPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
