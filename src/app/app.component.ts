import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/appState';
import { LoginState } from 'src/store/login/loginState';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Chats', url: 'home', icon: 'chatbubbles'},
    { title: 'Account', url: 'account', icon: 'settings'},
  ];

  username: string = '';
  email: string = '';
  loginStateSubscription: Subscription;


  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    
    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onLoggedIn(loginState);
    }); 
  }

  onLoggedIn(loginState: LoginState) {
    if (loginState.loggedIn) {
      this.username = firebase.default.auth().currentUser.displayName; 
      this.email = firebase.default.auth().currentUser.email;
    }
  }

}
