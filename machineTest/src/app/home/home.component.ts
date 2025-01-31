import { Experience, Education, User } from './../../interfaces/user.interface';
import { AddEducationDialogComponent } from './add-education-dialog/add-education-dialog.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExperianceDialogComponent } from './add-experiance-dialog/add-experiance-dialog.component';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('skillInputRef') skillInputRef!: ElementRef;
  isExperiance:boolean =false;
  userForm!: FormGroup;
  skillInput!: string ;

  constructor(private dialog: MatDialog,private fb: FormBuilder,private userService: UserService) {}

  ngOnInit(): void {

    // Initialize user form with empty arrays for experience and education
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      professionalSummary: ['', [Validators.required]],
      experience: this.fb.array([]),
      skills:this.fb.array([]),
      education: this.fb.array([]),
    });
  }

  openExperianceDialog(): void {
    const dialogRef = this.dialog.open(AddExperianceDialogComponent, {
      width: 'auto',
      height: 'fit',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Push the result (new experience data) into the experience FormArray
        const experienceArray = this.userForm.get('experience') as FormArray;
        experienceArray.push(this.fb.group(result));
        console.log('Experience added:', this.userForm?.get('experience')?.value);
      } else {
        console.log('Dialog was dismissed or form was invalid');
      }
    });
  }


  openEducationDialog(): void {
    const dialogRef = this.dialog.open(AddEducationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const educationArray = this.userForm.get('education') as FormArray;
        educationArray.push(this.fb.group(result));  
        console.log(this.userForm?.get('education')?.value);

      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      console.log(user); // Log the form data
  
      this.userService.createUser(user).subscribe(
        (response) => {
          console.log('User created successfully', response);
  
          // Show success alert using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'User Created',
            text: 'The user has been created successfully!',
            confirmButtonText: 'OK'
          });
          this.userForm.reset();
        },
        (error) => {
          console.error('Error creating user', error);
  
          // Show error alert using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while creating the user.',
            confirmButtonText: 'Try Again'
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  

  get skillsArray() {
    return this.userForm.get('skills') as FormArray;
  }

  
  addSkills() {
    const skillsArray = this.userForm.get('skills') as FormArray;
    skillsArray.push(this.fb.control(this.skillInputRef.nativeElement.value));
    console.log(this.userForm?.get('skills')?.value);
    this.skillInputRef.nativeElement.value = ''
  }

  removeSkill(index: number) {
    const skillsArray = this.userForm.get('skills') as FormArray;
    skillsArray.removeAt(index);
    console.log(this.userForm?.get('skills')?.value);
  }
}
