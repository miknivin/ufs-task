import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-education-dialog',
  standalone: true,
  imports: [MatDialogContent,NgIf,ReactiveFormsModule],
  templateUrl: './add-education-dialog.component.html',
  styleUrl: './add-education-dialog.component.css'
})
export class AddEducationDialogComponent implements OnInit {
  educationForm!: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddEducationDialogComponent>,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      course: ['', [Validators.required]],
      institutionName: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      shortNote: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      this.dialogRef.close(this.educationForm.value);  // Pass form values on submit
    }
  }

}
