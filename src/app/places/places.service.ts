/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placess: Place[] = [
    // eslint-disable-next-line max-len
    new Place ('p1', 'Manhatten Mention', 'in the heart', 'https://s3.amazonaws.com/images.seroundtable.com/google-vanish-1580301557.jpg', 147.99),
    new Place ('p2', 'Amor toujours', 'in the belly', 'https://s3.amazonaws.com/images.seroundtable.com/google-vanish-1580301557.jpg', 189.99),
    new Place ('p3', 'The foggy palace', 'in the balls', 'https://s3.amazonaws.com/images.seroundtable.com/google-vanish-1580301557.jpg', 99.99)
  ];


  get places() {
    // eslint-disable-next-line no-underscore-dangle
    return [...this.placess];
  }
  constructor() { }

  getPlace(id: string) {
    return {...this.placess.find(p => p.id === id)};
  }
}
