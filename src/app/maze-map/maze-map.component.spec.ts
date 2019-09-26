import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeMapComponent } from './maze-map.component';

describe('MazeMapComponent', () => {
  let component: MazeMapComponent;
  let fixture: ComponentFixture<MazeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
