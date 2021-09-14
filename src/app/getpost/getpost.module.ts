import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetpostPageRoutingModule } from './getpost-routing.module';

import { GetpostPage } from './getpost.page';
//import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetpostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GetpostPage]
})
export class GetpostPageModule {}
