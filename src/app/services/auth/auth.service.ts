import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { UserRegister } from 'src/app/model/user/userRegister';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.auth.signInWithEmailAndPassword(email, password)
            .then((firebaseUser: firebase.default.auth.UserCredential) => {
              observer.next({ email, id: firebaseUser.user.uid });
            }).catch(error => {
              observer.error(error);
              observer.complete()
            });
        });
    });
  }

  register(userRegister: UserRegister): Observable<void> {
    return new Observable<void>(observer => {
      this.auth.createUserWithEmailAndPassword(userRegister.email, userRegister.password)
        .then(() => {
          let userData = {
            username: userRegister.username,
            email: userRegister.email,
          }
          this.firestore.collection('/users/').add(userData)
            .then(() => {
              firebase.default.auth().currentUser.updateProfile({
                displayName: userRegister.username,
              });
              observer.next();
            }).catch(error => {
              observer.error(error);
              observer.complete();
            });
        });
    });
  }

  logout(): Observable<void> {
    return new Observable<void>(observer => {
      this.auth.signOut()
        .then(() => {
          observer.next();
        }).catch(error => {
          observer.error(error);
          observer.complete();
        });
    });

  }
}
