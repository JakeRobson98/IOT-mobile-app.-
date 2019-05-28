import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Provider } from '../../providers/provider/provider'
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  // living, kitchen, dining, toilet, bedroom
  provider: Provider;
  constructor(public navCtrl: NavController,  provider: Provider) {
    this.provider = provider;
  }
  

  




}
