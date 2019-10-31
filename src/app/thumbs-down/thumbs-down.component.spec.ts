import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbsDownComponent } from './thumbs-down.component';

describe('ThumbsDownComponent', () => {
  let component: ThumbsDownComponent;
  let fixture: ComponentFixture<ThumbsDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbsDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbsDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
