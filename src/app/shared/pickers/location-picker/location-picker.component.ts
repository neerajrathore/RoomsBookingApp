import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl.create({
      component: MapModalComponent
    }).then(modalEl => {
      // setting listener to catch data when we close modal which gives us a promise that we resolve asa modal dismiss
      // a modal can return data and a role when we listen to modal to be dismissed
      modalEl.onDidDismiss().then(modalData => {
        console.log(modalData.data);
      });
      modalEl.present();
    });
  }

}
