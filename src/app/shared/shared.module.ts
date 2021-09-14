// i can then import sharedmodule in any  component or any other module that  once used location picker or  map modal
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LocationPickerComponent, MapModalComponent],
  // imports to use things like ngIf import like commonmodule
  imports: [CommonModule, IonicModule],
  // exporting  it so that we can use it in any component or any module component that imports sharedmodule
  exports: [LocationPickerComponent, MapModalComponent],
  // entryComponent: []
})
export class SharedModule {

}
