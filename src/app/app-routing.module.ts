import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CanvasComponent } from './canvas/canvas.component';
import { LocationPickerComponent } from '../app/shared/pickers/location-picker/location-picker.component';

const routes: Routes = [

  {
    // this is starting page routing
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'places',
    loadChildren:  () => import('./places/places.module').then( m => m.PlacesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'bookings',
    loadChildren:  () => import('./bookings/bookings.module').then( m => m.BookingsPageModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'shots',
    loadChildren: () => import('./shots/shots.module').then( m => m.ShotsPageModule)
  },
  {
    path: 'getpost',
    loadChildren: () => import('./getpost/getpost.module').then( m => m.GetpostPageModule)
  },
  {
    path: 'canvas',
    component: CanvasComponent
  },
  {
    path: 'shared/pickers/location-picker',
    component: LocationPickerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
