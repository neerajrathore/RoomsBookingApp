import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy{
  isLoading = false;
  bookings: Booking[];
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    //set it up in bookingSub property then we cancel it in ngondestroy
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings  = bookings;
      //console.log(this.loadedBookings);
    });
    // subscribing to get fetch bookings
    // this.bookingService.fetchBookings().subscribe(books => {
    //   this.bookings = books;
    //   console.log(books);
    // });
  }

  ionViewWillEnter() {
    console.log('in ion now');
    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      // here i also get bookings array but i dont need  it cause of subscription in ngOnInit
      this.isLoading = false;
      console.log('ion', this.loadedBookings);
    });
  }

  // this cancels booking in our app hard coded
  // onCancelBooking(bookingId: string , slidingEl: IonItemSliding) {
  //   slidingEl.close();
  //   this.loadingCtrl.create({
  //     message: 'cancelling'
  //   }).then(loadingEl => {
  //     loadingEl.present();
  //     this.bookingService.cancelBooking(bookingId).subscribe(() => {
  //       loadingEl.dismiss();
  //     }
  //   );
  //   // upper code just showed loadingCtrl now below is the code to dismiss it
  //   });
  // }

  // this cancels booking on firebase server
  onCancelBooking(bookingId: string ,slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl.create({
      message: 'cancelling...'
    }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
        console.log(this.loadedBookings);
      });
    });
    // console.log(bookingId);

  }

  ngOnDestroy() {
    // lets check bookingSub is set before clearing subscription
    if (this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }
}
