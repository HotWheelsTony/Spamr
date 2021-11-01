import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { UserRegister } from 'src/app/model/user/userRegister';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private firebaseService: FirebaseService) 
  {}

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
          this.firestore.collection('users')
            .doc(firebase.default.auth().currentUser.uid)
            .set(userData)
            .then(() => {
              firebase.default.auth().currentUser.updateProfile({
                displayName: userRegister.username,
              }).then(() => {
                //in here i want to create the chats collection for this user,
                // which needs to have each chats unique id, the recipient also needs to be subscribed to 
                // each chat trhey are a member of 
                // when a chat is created both parties must be subscribed to the unique id
                // i cant do this for both parties when the chat is created 

                // CHATROOMS ARE THE SOLUTION
                // ENTER CHATROOM ID TO JOIN 
                  this.firebaseService.addChatroom('echo');
                  observer.next();        
              });
              
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
