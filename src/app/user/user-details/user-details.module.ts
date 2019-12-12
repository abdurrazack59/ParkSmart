import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDetailsPageRoutingModule } from './user-details-routing.module';

import { UserDetailsPage } from './user-details.page';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { ScrollVanishDirective } from 'src/app/directives/scroll-vanish.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicHeaderParallaxModule,
    UserDetailsPageRoutingModule
  ],
  declarations: [UserDetailsPage, ScrollVanishDirective],
})
export class UserDetailsPageModule {}
