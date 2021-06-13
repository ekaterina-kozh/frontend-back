import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';

declare const ymaps: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  @Input() position = [];
  latitude = 0;
  longitude = 0;
  @ViewChild('yamaps')
  el!: ElementRef;

  placemarks: any;
  placemarks1 = [];
  placemarks2 = [];


  geoObjects = [];
  st = 1;

  constructor() {
  }

  ngOnInit(): void {

    ymaps.ready().done(() => this.createMap());
  }

  private createMap(): void {
    var geolocation = ymaps.geolocation,
    map = new ymaps.Map('map', {
      center: [55.518244, 28.687788],
      zoom: 14,
      controls: ['zoomControl']
    });

    // tslint:disable-next-line:prefer-const
    var searchControl = new ymaps.control.SearchControl({
      options: {
        provider: 'yandex#search',
        noPopup: true,
        noSuggestPanel: true
      }
    });

    searchControl.events.add('load', function(event) {
      if (!event.get('skip') && searchControl.getResultsCount()) {
        var geoObjectsArray = searchControl.getResultsArray();
        geoObjectsArray.forEach(
          marker =>
            marker.options.set({
              iconLayout: 'default#image',
              iconImageHref: '../../assets/map-marker.png',
              iconImageSize: [30, 33],
              iconImageOffset: [-15, -33]
            })
        );
      }
    });

    map.controls.add(searchControl);

    searchControl.search('сервисный офис белВэб банк');

    searchControl.search('банкомат белВэб банк');
  }

  change() {

  }
}
