import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ServiceService } from '../service/service.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogin: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, private _route: ActivatedRoute) { }


  Images: Array<object> = [
    {
      src: '../../assets/slidone.jpg',
      alt: 'Image 1',
    }, {
      src: '../../assets/slidtwo.jpg',
      alt: 'Image 2'
    }, {
      src: '../../assets/slidthree.jpg',
      alt: 'Image 3'
    }
  ]
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20
  };

  logout() {
    this._auth.clearStorage();
    this.isLogin = true;
    this._router.navigate(['home']), { relativeTo: this._route };
  }
}
