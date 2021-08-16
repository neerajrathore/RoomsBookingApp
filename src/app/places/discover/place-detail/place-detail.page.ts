import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(private navCtrl: NavController, private route: ActivatedRoute, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      // if (paramMap.has('placeId')) {
      //   this.navCtrl.navigateBack('/places/offers');
      //   return;
      // }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    //this.router.navigateByUrl('/places/discover');
    //this.navCtrl.pop(); there should be a previous
    this.navCtrl.navigateBack('/places/discover');
  }

}
