import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = true;
  isLogin = true;
  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onLogin() {
      //this.isLoading = true;
      this.loadingCtrl
      .create({keyboardClose: true, message: 'logging in...'})
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          //this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/discover');
        }, 1500);
      });
      // this.authService.login();
      //
    // this.isLoading = true;
    // this.authService.login();
    //this.loadingCtrl.create({}).then
  }

  onSubmit(form: NgForm) {
     console.log(form);
    if (!form.valid){
      console.log('form is ', form.valid, 'getting out ');
      return;
    }
    console.log('form is ', form.valid, 'getting data');
    const email = form.value.email;
    const password = form.value.password;
    console.log('email', email, 'password', password);

    if (this.isLogin) {
      // send a request to login
    }
    else {
      //send a request to signup server
    }

  }
  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'you are logged in',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  onSwithAuthMode(){
    this.isLogin = !this.isLogin;
  }

}
