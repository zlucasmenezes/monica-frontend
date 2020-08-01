import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCredentialsDialogComponent } from './board-credentials-dialog.component';

describe('BoardCredentialsDialogComponent', () => {
  let component: BoardCredentialsDialogComponent;
  let fixture: ComponentFixture<BoardCredentialsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCredentialsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
