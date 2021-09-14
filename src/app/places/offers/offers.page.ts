import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  // we could also use loadingCtrl but here we use *ngIf in the template
  isLoading = false;
  private placesSub: Subscription;
  constructor(private placesService: PlacesService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // places seervice emits an events and we subscribe to it here
    // whenver we update places in our behavior subject we'll get notified here
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    // fetching places as we enter offers page
    this.placesService.fetchPlaces().subscribe((places) => {
      console.log(places);
      this.isLoading = false;
    });
  }


  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/',  'places', 'offers', 'edit', offerId]);
    console.log('editing item', offerId);
  }


  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
