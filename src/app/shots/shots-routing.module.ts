import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShotsPage } from './shots.page';

const routes: Routes = [
  {
    path: '',
    component: ShotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShotsPageRoutingModule {}
