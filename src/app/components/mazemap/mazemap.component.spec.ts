import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazemapComponent } from './mazemap.component';

describe('MazemapComponent', () => {
  let component: MazemapComponent;
  let fixture: ComponentFixture<MazemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
