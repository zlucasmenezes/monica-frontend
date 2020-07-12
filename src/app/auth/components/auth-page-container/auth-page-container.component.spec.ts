import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageContainerComponent } from './auth-page-container.component';

describe('AuthPageContainerComponent', () => {
  let component: AuthPageContainerComponent;
  let fixture: ComponentFixture<AuthPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
