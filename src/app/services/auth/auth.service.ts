import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}

  
  login(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.auth.signInWithEmailAndPassword(email, password)
            .then((firebaseUser: firebase.default.auth.UserCredential) => {
              observer.next({email, id: firebaseUser.user.uid});
            }).catch(error => {
              observer.error(error);
              observer.complete()
            });
        });
    });
  }
}
