import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/appState';
import { logout } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/loginState';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loginStateSubscription: Subscription;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onLoggedout(loginState);
    });
  }

  logout() {
    console.log("Logging out...")
    this.store.dispatch(logout());
  }

  onLoggedout(loginState: LoginState) {
    if (loginState.loggedOut) {
      this.router.navigate(['login']);
    }
  }

}
