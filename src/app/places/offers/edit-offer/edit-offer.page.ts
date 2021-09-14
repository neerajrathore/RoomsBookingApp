import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  isLoading = false;
  //placeIds = null;
  place: Place;
  form: FormGroup;
  placeId = null;
  private placeSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      this.placeId = paramMap.get('placeId');
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        // we are fetching a single place here
        // **and subscribe method takes more than one argument**
        .subscribe(place => {
          this.place = place;
          // this.place = this.placesService.getPlace(paramMap.get('placeId')); previous was this in
          // place of above four lines
          this.form = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            })
          });
          this.isLoading = false;
        },              // error as second function in subscribe this handle the error
        error => {
          this.alertCtrl.create({
            header: 'an error occurred',
            message: 'place could not be found',
            // buttons: ['Okay']
            buttons: [{text: 'hello',
              handler: () => {
                this.router.navigate(['places/offers']);
              }}]
          })  // this gives a promise utilize in then
          .then(alertEl => {
            alertEl.present();
          });
        });
    });
    // below was my code that i changes to make it work
    // this.placesService.fetchPlaces().subscribe();
    // this.placeIds = `${this.route.snapshot.paramMap.get('placeId')}`;
    // console.log('placeid is',this.placeIds);
  }



  onUpdateOffer() {
    if(this.form.valid !== true){
      console.log(this.form);
      return;
    }
    console.log('form valid is', this.form.status);
    console.log('form is', this.form);

    //first we needed to create onUpdateOffer in placesService to then use it here check along it send data to
    // update places in order to update it.
    this.loadingCtrl.create({
      message: 'updating place...'
    }).then(loadingEl => {
      loadingEl.present();
      console.log('presented');
      // this .subscribe () se phle vala gives a subscription
    this.placesService.updatePlace(this.placeId, this.form.value.title, this.form.value.description)
    .subscribe(() => {
      // this executes when we are done with updating places
      console.log('dismissed');
      loadingEl.dismiss();
      this.form.reset();
      this.router.navigate(['/places/offers']);
    });
    });
    }

    ngOnDestroy() {
      if (this.placeSub) {
        this.placeSub.unsubscribe();
      }
    }
}
