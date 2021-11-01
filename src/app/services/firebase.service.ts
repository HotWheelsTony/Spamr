import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    currentUser: any = null;

    constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
        this.auth.onAuthStateChanged((user) => {
            this.currentUser = user;
        });
    }

    addChatroom(roomId: string) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.default.auth().currentUser;
            this.firestore.collection('users').doc(currentUser.uid)
                .collection('rooms').add({
                    topic: roomId,
                }).then(
                    res => resolve(res),
                    err => reject(err)
                );
        });
    }

 
}