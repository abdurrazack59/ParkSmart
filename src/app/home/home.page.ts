import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: any = {};
  userName = '';
  mobileNumber = '';
  userImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCEzGoZ6NCvbjg4hJlLL_0TLB61J8R2Xi09hoiSpGxXvVdTRoB';
  latitude: any;
  longitude: any;


  @ViewChild('mapElement', { static: false }) mapNativeElement: ElementRef;

  constructor(private router: Router, private authService: AuthService,
    private apiService: ApiService,
    private geolocation: Geolocation) {
  }

  ngOnInit() {
    this.apiService.getUserDetails()
      .subscribe(data => {
        this.data = data.body;
        this.userName = data.body.fullName;
      });

  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: { lat: 12.979316, lng: 77.599773 },
        zoom: 15,
        disableDefaultUI: true
      });

      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      map.setCenter(pos);
      const icon = {
        url: '../assets/images/marker1.svg', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        optimized: false,
        icon: icon,

      });

      const infoWindow = new google.maps.InfoWindow;
      infoWindow.setPosition(pos);
      map.setCenter(pos);
      // marker.addListener('click', function () {
      //   infoWindow.open(map, marker);
      // });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    console.log('Logout Successful.');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: { lat: 12.979316, lng: 77.599773 },
        zoom: 17,
        disableDefaultUI: true
      });

      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      map.setCenter(pos);
      const icon = {
        url: '../assets/images/marker1.svg', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };

      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        optimized: false,
        icon: icon
      });

      const infoWindow = new google.maps.InfoWindow;
      infoWindow.setPosition(pos);
      map.setCenter(pos);
      // marker.addListener('click', function () {
      //   infoWindow.open(map, marker);
      // });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}





