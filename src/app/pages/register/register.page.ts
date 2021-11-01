import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppState } from 'src/store/appState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login } from 'src/store/login/login.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/registerState';
import { RegisterPageForm } from './register.page.form';

@Component({ 
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  form: FormGroup;
  registerStateSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
     private store: Store<AppState>, private firebaseService: FirebaseService) { }

  ngOnInit() { 
    this.form = new RegisterPageForm(this.formBuilder).createForm();
    this.registerStateSubscription = this.store.select('register').subscribe(registerState => {
      this.onRegistered(registerState);
      this.toggleLoading(registerState);
    });
  }

  ngOnDestroy() {
    this.registerStateSubscription.unsubscribe();
  }

  private onRegistered(registerState: RegisterState) {
    if (registerState.registered) {
      this.store.dispatch(login({
        email: this.form.value.email,
        password: this.form.value.password,
      }));  
    }
  }

  register() {
    this.store.dispatch(register({userRegister: this.form.value}));
  }

  
  private toggleLoading(registerState: RegisterState) {
    if (registerState.registering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  
}
