import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { HttpClient } from '@angular/common/http';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  MyLocation,
  MyLocationOptions,
  GoogleMapControlOptions,
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;
  fullName = 'Username';
  userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCEzGoZ6NCvbjg4hJlLL_0TLB61J8R2Xi09hoiSpGxXvVdTRoB';

  // current date object
  myDate = new Date().toISOString();
  myDateTime = new Date().toISOString();


  constructor(
    private apiService: ApiService,
    private platform: Platform,
    private menuController: MenuController,
    private locationAccuracy: LocationAccuracy,
    private httpClient: HttpClient,
    public toastCtrl: ToastController,
  ) {

  }


  async ngOnInit() {
    this.httpClient.get('./assets/museum.json').subscribe((data: any) => {
      console.log(data.museums[0]);
    });
    this.apiService.getUserDetails()
      .subscribe((data: any) => {
        this.fullName = data.fullName;
      });
    await this.platform.ready();
    await this.loadMap();
    this.requestLocation();
    this.goToMyLocation();
  }

  loadMap() {
    const mapOptions: GoogleMapControlOptions = {
      compass: false,
      myLocationButton: false,
      myLocation: false,
      indoorPicker: false,
      zoom: false,
      mapToolbar: false
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.goToMyLocation();
  }

  goToMyLocation() {
    const option: MyLocationOptions = {
      enableHighAccuracy: true
    };
    // Get the location of you
    this.map.getMyLocation(option).then((location: MyLocation) => {
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 13,
        bearing: 0,
        duration: 1000
      });
      const marker: Marker = this.map.addMarkerSync({
        icon: 'aqua',
        position: location.latLng,
        animation: 'DROP'
      });
      marker.showInfoWindow();
    });
  }

  getCurrentLocation() {
    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 15,
        bearing: 0,
        duration: 1000
      });
      // add a marker
      const marker: Marker = this.map.addMarkerSync({
        icon: 'aqua',
        position: location.latLng,
      });
      // show the infoWindow
      marker.showInfoWindow();
    }).catch(err => {
        this.showToast('Please Turn ON GPS');
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
      cssClass: 'customToast'
    });
    toast.present();
  }



  requestLocation() {
    // the accuracy option will be ignored by iOS
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        console.log('Request successful');
      },
      error => {
        console.log('Error requesting location permissions', error);
      }
    );

  }

  closeMenu() {
    this.menuController.close();
  }

}


