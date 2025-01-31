import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';

import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-cv-viewer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './cv-viewer.component.html',
  styleUrl: './cv-viewer.component.css'
})
export class CvViewerComponent implements OnInit{
   @ViewChild('cvProfile') cvProfile!: ElementRef;
  user!: User;
  constructor(private userService:UserService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.userService.getUserById(userId).subscribe(
          (data) => {
            this.user = data;
            console.log('User Data:', this.user);
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      }
    });
  }


  download() {
    const cvElement = this.cvProfile.nativeElement;

    html2canvas(cvElement, {
      logging: true,
      useCORS: true,
      scale: 1.2
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 0, 0, canvas.width / 5, canvas.height / 5);
      doc.save('cv-profile.pdf');
    });
  }
}
