import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-shots',
  templateUrl: './shots.page.html',
  styleUrls: ['./shots.page.scss'],
})
export class ShotsPage implements OnInit {
  currentImage: any;

  screen: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  state: boolean = false;
  constructor(private camera: Camera,  private navCtrl: NavController, private screenshot: Screenshot) { }

  ngOnInit() {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      //saveToPhotoAlbum: true,
      // targetWidth: 100,
      // targetHeight: 100
      //allowEdit: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      this.screenShotURI();
      console.log('camera Size = ' + this.currentImage);
    }, (err) => {
      // Handle error
      console.log('Camera issue:' + err);
    });
  }
  reset() {
    const self = this;
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    setTimeout(function(){
      self.state = false;
    }, 1000);
  }
  screenShot() {
    this.screenshot.save('jpg', 80, 'myscreenshot').then(res => {
      this.screen = res.filePath;
      console.log(res.filePath);
      this.state = true;
      this.reset();
    });
  }
  screenShotURI() {
    this.screenshot.URI(80).then(res => {
      this.screen = res.URI;
      console.log(res.URI);
      this.state = true;
      this.reset();
    });

}
}
