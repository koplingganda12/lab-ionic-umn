import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() { }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    //this.modalCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Booking the place ...'
    })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
          this.modalCtrl.dismiss({ message: 'booked!' },
            'confirm');
        }, 2000);
      })
  }

  async bookPlace() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Book Place',
      buttons: [{
        text: 'Book w/ Random Date',
        handler: () => {this.onBookPlace(),
          this.modalCtrl.create({ component: CreateBookingComponent,
          componentProps: { selectedPlace: this.selectedPlace } })
          .then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
          })
          .then(resultData => {
            console.log(resultData);
          });
        }
      }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {this.onBookPlace(),
            console.log('Cancel clicked');
          }
      }]
    });
    await actionSheet.present();
  }

}
