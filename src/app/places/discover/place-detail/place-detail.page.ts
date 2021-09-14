import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { BookingService } from '../../../bookings/booking.service' ;
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  private placeSub: Subscription;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    // we are fetching place Data here and we are updating it when we get new paramMep
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      // this.place = this.placeService.getPlace(paramMap.get('placeId')); previous was this
      // when places changes this gets updated
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(place => {
          // we load our place here
          this.place = place;
          // if placeuserid and authservice userid dont match then we are creater of that place
          this.isBookable = place.userId !== this.authService.userId;
          console.log('isBookable', this.isBookable);
        });
    });
  }

  onBookPlace() {
    //this.router.navigateByUrl('/places/discover');
    //this.navCtrl.pop(); there should be a previous
    //this.navCtrl.navigateBack('/places/discover');
    this.actionSheetCtrl.create({
      header: 'choose a action',
      buttons: [
        {
          text: 'select date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'random date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'cancel',
          role: 'cancel'
        }
    ]

    }).then(actionsheetEl => {
      actionsheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode);
    // below is modal functionality
    this.modalCtrl
    .create({component: CreateBookingComponent, componentProps: {selectedPlace: this.place, selectedMode: mode}
    })
    .then(modalEl => {
      console.log('hello1');
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log('hello2');
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'confirm'){
        //console.log('booked');
        this.loadingCtrl.create({
          message: 'Booking Place...'
        }).then(modalEl => {
          modalEl.present();

          this.bookingService.addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            resultData.data.bookingData.firstName,           // all this named in createbooking component
            resultData.data.bookingData.lastName,
            resultData.data.bookingData.guestNumber,
            resultData.data.bookingData.startDate,
            resultData.data.bookingData.endDate
            ) // add Booking is observable so we can subscribe to it.
            .subscribe(() => {
              // this make sure that we remove the loading indicator
              modalEl.dismiss();
            });
        });
      }
    });
  }
  // use it to get directly to componenet
  // takme() {
  //   this.router.navigateByUrl('/bookings/create-booking/create-booking.module');
  // }

  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

}
