
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusButtonMenuComponent } from './status-button-menu.component';

describe('StatusButtonMenuComponent', () => {
  let component: StatusButtonMenuComponent;
  let fixture: ComponentFixture<StatusButtonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusButtonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
