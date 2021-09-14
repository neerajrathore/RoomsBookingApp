import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElementRef: ElementRef;

  constructor(private modalCtrl: ModalController, private renderer: Renderer2) { }

  ngOnInit() {}

  // after view has been initialized
  ngAfterViewInit() {
    //start intializing google maps
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: {lat: 26.88, lng: 75.78},
        zoom: 16
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      });

      map.addListener('click', event => {
        const selectedCoords = {lat: event.latLng.lat(), lng: event.latLng.lng()};
        this.modalCtrl.dismiss(selectedCoords);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  // oncancel hander which triggers when we click oncancel button on toolbar
  onCancel() {
    this.modalCtrl.dismiss();
  }

  // this is use to load maps javascript sdk
  // kindly explore it more later
  private getGoogleMaps(): Promise<any> {
    // getting access to window **window is available globally in javascript**
    const win = window as any;
    // win.google is refer to a variable that by defult is not set
    // this will set whem we import javascript sdk
    const googleModule  = win.google;

    if(googleModule && googleModule.maps) {
      // maps entry point to maps sdk
      return Promise.resolve(googleModule.maps);
    }
    // calling anonymus calling functions resolve and reject
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZPFaApoF9iTHYeugUQV9RAfv3pSEIRJs';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      // this is not rendering in angular tempelate
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('sdk not availalble');
        }
      };
    });
  }

}
