import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperianceDialogComponent } from './add-experiance-dialog.component';

describe('AddExperianceDialogComponent', () => {
  let component: AddExperianceDialogComponent;
  let fixture: ComponentFixture<AddExperianceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExperianceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExperianceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
