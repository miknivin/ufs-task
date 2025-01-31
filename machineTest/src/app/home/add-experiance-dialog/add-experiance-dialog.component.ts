import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { _MatInternalFormField } from '@angular/material/core';
import { MatDialogActions, MatDialogContainer, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-add-experiance-dialog',
  standalone: true,
  imports: [MatDialogContent,MatFormFieldModule, ReactiveFormsModule,NgIf],
  templateUrl: './add-experiance-dialog.component.html',
  styleUrl: './add-experiance-dialog.component.css'
})
export class AddExperianceDialogComponent {
  experienceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddExperianceDialogComponent>
  ) {}

  ngOnInit(): void {
    this.experienceForm = this.fb.group({
      companyName: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
    });
  }

  // Cancel and close the dialog
  onCancel(): void {
    this.dialogRef.close();
  }

  // Submit the form data
  onSubmit(): void {
    if (this.experienceForm.valid) {
      const formData = this.experienceForm.value;
      console.log(formData); // Process the data as needed
      this.dialogRef.close(formData); // You can pass the form data to the parent component
    } else {
      console.log('Form is invalid');
    }
  }
}
