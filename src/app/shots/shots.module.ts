import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShotsPageRoutingModule } from './shots-routing.module';

import { ShotsPage } from './shots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShotsPageRoutingModule
  ],
  declarations: [ShotsPage]
})
export class ShotsPageModule {}
