import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
// lifecycle interface onDestroy should be implemented
export class DiscoverPage implements OnInit, OnDestroy {
  isLoading = false;
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private menuCtrl: MenuController, private authService: AuthService) { }

  ngOnInit() {
    // we store our subscription placesub here
    this.placesSub = this.placesService.places.subscribe(places => {
      // when places changes we know it in loadedplaces by this
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilterUpdate(event: any) {
    //console.log(event.detail);
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
    else {
       //filter function will look at every place so this func will executed on every place in loadedplace array
      this.relevantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.authService.userId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy() {
    // if placesSub is a thing or is true
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
