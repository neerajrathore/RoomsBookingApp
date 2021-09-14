import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-shots',
  templateUrl: './shots.page.html',
  styleUrls: ['./shots.page.scss'],
})
export class ShotsPage implements OnInit {
  // currentImage: any;

  // screen: any
  image: any='';
  imageData: any='';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  UriData: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  state: boolean = false;
  copyFileToLocalDir: any;
  createFileName: any;
  constructor(public filePath: FilePath, private transfer: FileTransfer, private camera: Camera, private fileChooser: FileChooser,
    private file: File, public base64: Base64,  private navCtrl: NavController,
    private screenshot: Screenshot, public loadingController: LoadingController,
    private platform: Platform) { }

  ngOnInit() {
  }

//   takePicture(sourceType) {
//   const options = {
//     quality: 60,
//     targetWidth:900,
//     sourceType,
//     saveToPhotoAlbum: false,
//     correctOrientation: true
//   };
//   // Get the data of an image
//   this.camera.getPicture(options).then((imagePath) => {
//     if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
//       console.log('image path',imagePath);
//       window.FilePath.resolveNativePath(imagePath)
//       .then(res => {
//         let correctPath = res.substr(0, res.lastIndexOf('/') + 1).toString();
//         let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length).toString();
//         this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//       }).catch(err=>{
//         console.log('unable to resolve file path issue', err)
//       });
//     } else {
//       const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
//       const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//       console.log(currentName,correctPath);
//       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//     }
//   }, );
// }



  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 30,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     //saveToPhotoAlbum: true,
  //     // targetWidth: 100,
  //     // targetHeight: 100
  //     //allowEdit: true
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.currentImage = 'data:image/jpeg;base64,' + imageData;
  //     this.screenShotURI();
  //     console.log('camera Size = ' + this.currentImage);
  //   }, (err) => {
  //     // Handle error
  //     console.log('Camera issue:' + err);
  //   });
  // }
  // reset() {
  //   const self = this;
  //   // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  //   setTimeout(function(){
  //     self.state = false;
  //   }, 1000);
  // }
  // screenShot() {
  //   this.screenshot.save('jpg', 80, 'myscreenshot').then(res => {
  //     this.screen = res.filePath;
  //     console.log(res.filePath);
  //     this.state = true;
  //     this.reset();
  //   });
  // }
  // screenShotURI() {
  //   this.screenshot.URI(80).then(res => {
  //     this.screen = res.URI;
  //     console.log(res.URI);
  //     this.state = true;
  //     this.reset();
  //   });

  chooseFileForAndroid() {
    this.fileChooser
      .open()
      .then(url => {
        this.filePath.resolveNativePath(url)
          .then(filePath => {
                console.log(filePath);
          });
          this.UriData.push({name:
            url.substr(url.lastIndexOf('/') + 1)});
            console.log('Data Uri =>', this.UriData);
      })
      .catch(e => {
        console.log(e);
      });
  }
  //hello

  //below is working file choosser data
  // fileChoose(){
  //   // choose your file from the device
	// this.fileChooser.open().then(uri => {
	// 	alert('uri'+JSON.stringify(uri));
  //   this.base64.encodeFile(uri).then(base64File => {
  //     alert('base64 ' + base64File);
  //   }).catch(err => {
  //     alert('erreur base64 => ' + err);
  //   });
  //       // get file path
	// 	this.filePath.resolveNativePath(uri)
	// 	.then(file => {
	// 		alert('file'+JSON.stringify(file));
	// 		const filePath: string = file;
  //     console.log('file path',filePath);
	// 		if (filePath) {
  //               // convert your file in base64 format
	// 			this.base64.encodeFile(filePath)
  //               .then((base64File: string) => {
	// 				alert('base64File'+JSON.stringify(base64File));
	// 			}, (err) => {
	// 				alert('err'+JSON.stringify(err));
	// 			});
	// 		}
	// 	})
	// 	.catch(err => console.log(err));
	// })
	// .catch(e => alert('uri'+JSON.stringify(e)));
  // }

  // upload() {
  //   let options: FileUploadOptions = {
  //      fileKey: 'file',
  //      fileName: 'name.jpg',
  //      headers: {};
  //   }
  //
  //   fileTransfer.upload('<file path>', '<api endpoint>', options)
  //    .then((data) => {
  //      // success
  //    }, (err) => {
  //      // error
  //    })
  // }

  // uploadImageData(formData: FormData) {

  //   this.httpx.post(uploadURL, formData)
  //     .pipe(
  //       finalize(() => {
  //         this.global.presentAlert('Success', 'finalize');
  //       })
  //     )
  //     .subscribe(res => {


  //       this.global.presentAlert('subscribe', 'subscribe');

  //     });
  // }

  // readFile(file: any) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const formData = new FormData();
  //     const imgBlob = new Blob([reader.result], {
  //       type: file.type
  //     });
  //     formData.append('file', imgBlob, file.name);
  //     this.uploadImageData(formData);
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

  // startUpload(imgEntry) {
  //   this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
  //     .then(entry => {
  //       (<FileEntry>entry).file(file => this.readFile(file));
  //     })
  //     .catch(err => {
  //       this.global.presentAlert('Error', 'Error while reading file.');
  //     });
  // }




}
