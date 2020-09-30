import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TsDetailsComponent } from './ts-details.component';

describe('TsDetailsComponent', () => {
  let component: TsDetailsComponent;
  let fixture: ComponentFixture<TsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TsDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
