import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File  } from '@ionic-native/file/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateBookingComponent } from './bookings/create-booking/create-booking.component';
import { CanvasComponent } from './canvas/canvas.component';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './getpost/in-memory-data.service';

@NgModule({
  declarations: [AppComponent, CreateBookingComponent, CanvasComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule,
     ],
  providers: [Camera, Geolocation, LaunchNavigator, NativeGeocoder, Screenshot, FileTransfer, FileChooser, Base64, FilePath,
    FileTransfer, File, CanvasRenderingContext2D, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
