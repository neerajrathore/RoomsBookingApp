/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

// removing dummy places as now we fetch places from firebase
    // eslint-disable-next-line max-len
    // [new Place (
    //   'p1',
    //   'Manhatten Mention',
    //   'in the heart',
    //   'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
    //   147.99,
    //   new Date('2019-01-01'),
    //     new Date('2019-12-31'),
    //     'abc'
    //   ),
    //   new Place ('p2',
    //   'Amor toujours',
    //   'in the belly',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
    //   189.99,
    //   new Date('2019-01-01'),
    //     new Date('2019-12-31'),
    //     'abc'
    //   ),
    //   new Place ('p3',
    //   'The foggy palace',
    //   'in the balls',
    //   'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
    //   99.99,
    //   new Date('2019-01-01'),
    //     new Date('2019-12-31'),
    //     'abc'
    //   )]

// defining my resData of places will look like
interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // behavior is constract when we subscribe to it we get latest previous emitted value
  //_plaxces give us array of place. All places goes as a argument in behavior subject
  //previous was private _places: Place[] = []
  private _places = new BehaviorSubject<Place[]>([]);


  get places() {
    // return [...this._places]; previous was this
    // eslint-disable-next-line no-underscore-dangle
    return this._places.asObservable();
    // asObervable simply gives us subscribable object so that from outside we can subs. to it
    // this.places gives subscribavle part// now places is observables
  }
  constructor(private authService: AuthService,  private http: HttpClient) { }

  fetchPlaces() {
    return this.http
    // get is generic type we can define structure of data we get back
    // right side type of value inside these keys *-*keys with names i dont know*_*
    // we could use place here {} but we dont have id in there
    // eslint-disable-next-line @typescript-eslint/naming-convention
    .get<{[key: string]: PlaceData }>('https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json')
    // previous this was working as we need to restructure data we get from firebase
    // .pipe(tap(resData => {
    //   console.log(resData);
    // }))
    // map takes response from firebase switchMap returns new obseevable and map returns non observable data
    .pipe(
      // map operater in observable chain in the end get the response data & returns restructured response data
      map(resData => {
      // transforming object in array
      const places =[];
      // going through keys in resData
      for (const key in resData) {
        if(resData.hasOwnProperty(key)) {
          places.push(new Place(
            key,
            resData[key].title,
            resData[key].description,
            resData[key].imageUrl,
            resData[key].price,
            // new date objext with Date constructor
            new Date(resData[key].availableFrom),
            new Date(resData[key].availableTo),
            resData[key].userId
            ));
        }
      }
      // so that it returns restructured resData=
      return places;
      // return [];
      // faking it to return a empty array
    }),
    // next step in pipe method
    // this give us places in subscrive method
    tap(places => {
      // using places to update our places list in _places behavior subject by emmitting new event with the places we
      // generated in map
      // making sure all places in update did subscribe get the latest places
      // eslint-disable-next-line no-underscore-dangle
      this._places.next(places);
    })
    );
  }

  getPlace(id: string) {
    // we are returning an observable so subs to it in **placedetail** page
    return this.places.pipe(
      take(1),
      // eslint-disable-next-line arrow-body-style
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  // this gets called from form
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    // generated id is for saving the recieved random name from firebase
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    //this._places.push(newPlace); previouslly we were pushing new place to list of _places
    // previous was below to take 1 and concat to newplace
    // take(1),means take a look at my subject place and only take 1 object then cancel the subscription
    // this.places.pipe(take(1)).subscribe(places => {
    //   this._places.next(places.concat(newPlace));
    // });
    return this.http.post<{name: string}>(
        'https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json',
        {
          ...newPlace,
          id: null
        }
      )
      .pipe(
        //below default work to send data to firebase
        // take(1),
        // tap(resData => {
        //   console.log(resData);
        // })
        // eslint-disable-next-line arrow-body-style
        switchMap(resData => {
          // this will return a new observable in the upcoming chanfe
          generatedId = resData.name;  // saving that unique id generated by firebase in generated id
          return this.places;          // TO GET MY places array
        }),
        take(1),                   // take1 cause i need only one place
        tap(places => {
          // we are working only places  **new place available in entire workplace method**
          newPlace.id = generatedId;         // switching id and replace with one i got from backend
          // eslint-disable-next-line no-underscore-dangle
          this._places.next(places.concat(newPlace));
            })
      );
      // **this gets access to existing places and concat the new added place**
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(places => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  // **old one** this update in place with our existing list of places
  // updatePlace(placeId: string, title: string, description: string) {
  //    return this.places.pipe(
  //     // first of all take(1) so that we get latest snapshot of list not any future update
  //     // switchMap to switch my observable which currently target that array of places
  //     take(1),
  //     delay(1000),
  //     tap(places => {
  //       const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
  //       //copying old places array to something so that we dont mutate
  //       const updatedPlaces = [...places];
  //       const oldPlace = updatedPlaces[updatedPlaceIndex];
  //       // accessing the element which i wanna change
  //       updatedPlaces[updatedPlaceIndex] = new Place(
  //         oldPlace.id,
  //         title,
  //         description,
  //         oldPlace.imageUrl,
  //         oldPlace.price,
  //         oldPlace.availableFrom,
  //         oldPlace.availableTo,
  //         oldPlace.userId
  //       );
  //       // eslint-disable-next-line no-underscore-dangle
  //       this._places.next(updatedPlaces);
  //     })
  //     );
  // }


    // sending http update request to firebase
    // put replaces the exiting resource u r targeting with the new resource u r sending along with this request
    // `` alows u to inject dynamic values into string with ${}
    //this.http.put(`https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${placeId}.json`);
    //returing subscription here so that we can listen to it
    //return this.places.pipe(
      // first of all take(1) so that we get latest snapshot of list not any future update
      //take(1),
      // delay to delay a process
      // tap into so that we can executed some with the places existing list of it
      //tap(places => {
        //pl eexecute on every place element and compare its id to placeId if its equal thats the place and saves its index

        // this emits updatedPlaces array
        // eslint-disable-next-line no-underscore-dangle
        //this._places.next(updatedPlaces);
      //})
    //);



  // **new update place that is working**  updating on server
  updatePlace(placeId: string, title: string, description: string) {
    // initialize updatedPlaces to access it in tap
    let updatedPlaces: Place[];
    // returning this observable chain so that inside our component we can subs to it
     //starting with to take latest snapshot
     // at first places is empty cause we dont fetch data in it
     return this.places.pipe(
      // first of all take(1) so that we get latest snapshot of list not any future update
      // switchMap to switch my observable which currently target that array of places into the http observable
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          // fetch places give us updated list of places
          console.log('places is 0');
          return this.fetchPlaces();
        }
        else {
          // of takes any value array or number wraps in new obervable that will emmit value
          console.log('places is good');
          return of(places);
        }
        }),
        // here places is gurantee to be an array
        switchMap(places => {
          const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        //copying old places array to something so that we dont mutate
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        // accessing the element which i wanna change
        // update my places on array of places
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        // *** updating above before http request sent below ***
        // sending http update request to firebase
        // put replaces the exiting resource u r targeting with the new resource u r sending along with this request
        // `` alows u to inject dynamic values into string with ${}
        return this.http.put(
          `https://ionicfcm-b25ff-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${placeId}.json`,
          {...updatedPlaces[updatedPlaceIndex], id: null }
           //second argument on this put has to be data with which the existing data on this node should be replaced existing place with new title & description
      );
        }),
      tap(() => {
        // eslint-disable-next-line no-underscore-dangle
        this._places.next(updatedPlaces);
        console.log('All Places', updatedPlaces);
      })
      );

  //   //returing subscription here so that we can listen to it
  //   //return this.places.pipe(
  //     // first of all take(1) so that we get latest snapshot of list not any future update
  //     //take(1),
  //     // delay to delay a process
  //     //delay(1000),
  //     // tap into so that we can executed some with the places existing list of it
  //     //tap(places => {
  //       //pl eexecute on every place element and compare its id to placeId if its equal thats the place and saves its index

  //       // this emits updatedPlaces array
  //       // eslint-disable-next-line no-underscore-dangle

      }

}


