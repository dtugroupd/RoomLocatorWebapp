import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteMeComponent } from './user-delete-me.component';

describe('UserDeleteMeComponent', () => {
  let component: UserDeleteMeComponent;
  let fixture: ComponentFixture<UserDeleteMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
