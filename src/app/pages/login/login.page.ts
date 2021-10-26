import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/appState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, loginFailed, loginSuccess } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/loginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onLoggingIn(loginState);
      this.onLoggedIn(loginState);
      this.onError(loginState);
      this.toggleLoading(loginState);
    });

  }

  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.loggingIn) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onLoggingIn(loginState: LoginState) {
    if (loginState.loggingIn) {
      const email = this.form.get("email").value;
      const password = this.form.get("password").value;
      this.authService.login(email, password).subscribe(user => {
        this.store.dispatch(loginSuccess({ user }));
      }, error => {
        this.store.dispatch(loginFailed({error}))
      });
    }
  }

  private onLoggedIn(loginState: LoginState) {
    if (loginState.loggedIn) {
      this.router.navigate(['home']);
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) { 
      const toast = await this.toastController.create({
        position: "top",
        duration: 3500,
        message: loginState.error.message,
        color: "danger"
      });
      toast.present();
    }
  }

  login() {
    console.log("Logging in");
    const email = this.form.get("email").value;
    const password = this.form.get("password").value;
    this.store.dispatch(login({email, password}));
  }

  register() {
    this.router.navigate(['register']);
  }

}
