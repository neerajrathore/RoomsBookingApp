import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';



@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  lattitude: any = 0;
  longitude: any = 0;
  address: string;


  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder
    ) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  ngOnInit() {
  }

  // getLocation = () => {
  //   this.launchNavigator.navigate([26.895043, 75.800195]);
  //   //console.log(latitude, longitude );

  // };

  openLocation = () => {
    console.log('location');
    console.log(this.lattitude, this.longitude);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lattitude= resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  };

  // below code is useless ///

  // geocoder options
  // eslint-disable-next-line @typescript-eslint/member-ordering
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  // get address using coordinates
  getAddress(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.pretifyAddress(res[0]);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  // address
  pretifyAddress(address){
    // eslint-disable-next-line prefer-const
    let obj = [];
    let data = '';
    // eslint-disable-next-line guard-for-in
    for (const key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if(obj[val].length)
      {data += obj[val]+', ';}
    }
    return address.slice(0, -2);
  }
}
