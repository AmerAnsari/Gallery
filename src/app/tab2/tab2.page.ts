import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton, IonGrid,
  IonHeader,
  IonIcon, IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { PhotoService, UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonRow,
    IonGrid,
    IonCol,
    IonImg,
  ],
})
export class Tab2Page implements OnInit {

  constructor(public photoService: PhotoService,
              public actionSheetController: ActionSheetController) {
    addIcons({ camera });
  }

  ngOnInit(): void {
    this.photoService.loadSaved().then();
  }

  takePhoto(): void {
    this.photoService.addNewToGallery().then();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }
}
