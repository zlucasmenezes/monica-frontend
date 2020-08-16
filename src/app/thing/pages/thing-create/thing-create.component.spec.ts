import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingCreateComponent } from './thing-create.component';

describe('ThingCreateComponent', () => {
  let component: ThingCreateComponent;
  let fixture: ComponentFixture<ThingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
