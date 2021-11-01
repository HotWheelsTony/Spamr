import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/appState';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public rooms: any;


  constructor(private router: Router,
    private store: Store<AppState>) { }


  ngOnInit() {
    this.store.select
    this.rooms = this.getRooms();
    console.log(this.rooms);

  }

  getRooms() {
    const list: any = [];
    firebase
      .default
      .firestore()
      .collection('users')
      .doc(firebase.default.auth().currentUser.uid)
      .collection('rooms')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {
            topic,
          } = doc.data();
          list.push({
            id: doc.id,
            topic: topic,
          });
        });
      });
    return list;
  }

  chat(topic: string) {
    this.router.navigate(['chat', { topic: topic }]);
  }

  compose() {
    this.router.navigate(['compose']);
  }



}
