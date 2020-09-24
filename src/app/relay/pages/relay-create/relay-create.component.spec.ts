import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RelayCreateComponent } from './relay-create.component';

describe('RelayCreateComponent', () => {
  let component: RelayCreateComponent;
  let fixture: ComponentFixture<RelayCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelayCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
