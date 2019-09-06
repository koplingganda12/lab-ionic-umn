import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  
  private _places: Place[]= [
    new Place(
      'p1',
      'Gading Apartment',
      '2BR, Luas dan Cozy',
      'https://jendela360.com/gallery/apartment/gading-icon58a56de27674b.jpg',
      100000000
    ),
    new Place(
      'p2',
      'Serpong Apartment',
      'Apartemen Romantis',
      'http://www.sewa-apartemen.net/images9/65658_4.jpg',
      125000000
    ),
    new Place(
      'p3',
      'BSD Apartment',
      'Apartemen Murah',
      'http://www.jual-apartemen.com/images3/29950_6.jpg?1556685690',
      50000000
    )
  ];

  get places() {
    return [...this._places];
  }



  constructor() { }
}
