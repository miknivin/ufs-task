import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CvViewerComponent } from './cv-viewer/cv-viewer.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'view', component: ViewUsersComponent },
  { path: 'view-cv/:id', component: CvViewerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
