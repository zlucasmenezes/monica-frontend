import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayDetailsComponent } from './relay-details.component';

describe('RelayDetailsComponent', () => {
  let component: RelayDetailsComponent;
  let fixture: ComponentFixture<RelayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
