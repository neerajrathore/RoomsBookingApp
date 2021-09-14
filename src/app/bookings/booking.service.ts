import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface BookingData {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // new behavior subject that initialize with empty array that was prevoius : Booking[] in below line
  // so it new empty array and generic type will be Booking array <Booking[]>
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    //
    // eslint-disable-next-line no-underscore-dangle
    //return [...this._bookings];
    // eslint-disable-next-line no-underscore-dangle
    return this._bookings.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient) { }

  // so we have to adjust our component as well as we change in get bookings.
  // addBooking(
  //   placeId: string,
  //   placeTitle: string,
  //   placeImage: string,
  //   firstName: string,
  //   lastName: string,
  //   guestNumber: number,
  //   dateFrom: Date,
  //   dateTo: Date,
  //   ) {
  //     const newBooking = new Booking(
  //       Math.random().toString(),
  //       placeId,   // received as an argument
  //       this.authService.userId,   //userId is managed in the authService so we have to inject it
  //       placeTitle,  // received as an argument
  //       placeImage,  // received as an argument
  //       firstName,
  //       lastName,
  //       guestNumber,
  //       dateFrom,
  //       dateTo
  //       );
  //       // returning this so that another part of application that are subs to it can receive it
  //       return this.bookings.pipe(
  //         take(1),
  //         delay(1000),
  //         tap(bookings => {
  //           // eslint-disable-next-line no-underscore-dangle
  //           this._bookings.next(bookings.concat(newBooking));
  //         })
  //         );
  // }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date,
    ) {
      // saving generated id from firebase
      let generatedId: string;
      const newBooking = new Booking(
        Math.random().toString(),
        placeId,   // received as an argument
        this.authService.userId,   //userId is managed in the authService so we have to inject it
        placeTitle,  // received as an argument
        placeImage,  // received as an argument
        firstName,
        lastName,
        guestNumber,
        dateFrom,
        dateTo
        );
        // data we get here has same structure of adding a place **name is id generated by firebase**
        return this.http.post<{name: string}>(
          'https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/booked-places.json',
          // second argument is the data we do wanna store not the autogenerated id from math.random()
          // overriding id with null so that firebase will not store it
          {...newBooking, id: null})
          // eslint-disable-next-line arrow-body-style
          // switchMap to get all the bookings
          .pipe(switchMap(resData => {
            generatedId = resData.name;
            console.log('generatedId is', generatedId , resData);
            return this.bookings;
          }),take(1),
          // take is necessary otherwise we go on never ending subscription
          tap(bookings => {
            newBooking.id = generatedId;
            // eslint-disable-next-line no-underscore-dangle
            this._bookings.next(bookings.concat(newBooking));
          })
          );
  }

  // this.delete booking in app not in firebase
  // cancelBooking(books: string) {
  //   // not changing an existing one like updating place we will here delete a booking
  //   return this.bookings.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(bookings => {
  //       // explore something about it
  //       // filter our array of bookings down to smaller array of bookings
  //       // ** if allbooking id is not equal to books as we get that as an argument then we'll return true
  //       // then we check for not equality means thats the booking we wanna keep when filter returnes false
  //       //
  //       // when we look for all bookings in array and when some bookikngId is equal to books that i get as an
  //       //arggument then this is the booking we wanna cancel filter will return false it  will not be includede in
  //       // bookings array it will filter out
  //       // eslint-disable-next-line no-underscore-dangle
  //       this._bookings.next(bookings.filter(allBooking => allBooking.id !== books));
  //     })
  //     );
  // }

  cancelBooking(bookingId: string) {
    return this.http.delete
    (`https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/booked-places/${bookingId}.json`
    )
      // not changing an existing one like updating place we will here delete a booking
     // eslint-disable-next-line arrow-body-style
     .pipe(switchMap(() => {
     // returning booking as we are safe here as we see list before deleting it
     return this.bookings;
     // taking one snapshot of it
    }),take(1),
    // returing bookings up there which is behavior subject and in next i emit a new event and that trigers**
    // this.bookings and that created a infinite loop**
     tap(bookings => {
        // eslint-disable-next-line no-underscore-dangle
        this._bookings.next(bookings.filter(allBooking => allBooking.id !== bookingId));
     }));
    }

  fetchBookings() {
    // only showing bookings for users who made them
    return this.http
    // query parameter to narrow down what we wanna fetch from firebase my vs guider data   **tells firebase order result by userId**
    //.get<{[Key: string]: BookingData}>('https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/booked-places.json')
    .get<{[Key: string]: BookingData}>
    // data we get back will have this dynamic key and value for each key in the format of BookingData
    (`https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/booked-places.json?orderBy="userId"&equalTo="${
      this.authService.userId}"`)
      // tells firebase to give only the bookings of this userId
      // pipe cause firebase gives us an object where we have keys wjich are unique id which then holds hold the actual data
    .pipe(
      map(resData => {
        const bookings = [];
        for (const key in resData){
          if(resData.hasOwnProperty(key)) {
            bookings.push(new Booking(
              key,
              resData[key].placeId,
              resData[key].userId,
              resData[key].placeTitle,
              resData[key].placeImage,
              resData[key].firstName,
              resData[key].lastName,
              resData[key].guestNumber,
              new Date(resData[key].bookedFrom),
              new Date(resData[key].bookedTo),

            ));
          }
        }
        /// our observable chain in the end yields a booking
        return bookings;
      }),
      tap(bookings => {
        // emits the bookings i just fetch as new list of bookings
        // eslint-disable-next-line no-underscore-dangle
        this._bookings.next(bookings);
      })
    );
  }


}
