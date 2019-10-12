import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../classes/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFireAuth,
              private db: AngularFireDatabase,
              private ngFM: NgFlashMessageService) { }


  register(user: User) {
    return this.af.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  writeToDB() {
    const user = this.getUser();
    this.db.database.ref('users').child(user.uid).set({email: user.email}, (e) => console.log(e));
  }

  login(user: User) {
    return this.af.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    this.af.auth.signOut();
  }

  findUserById(id: string) {
    return this.db.database.ref('users/' + id);
  }

  getUser() {
    return this.af.auth.currentUser;
  }

  isAuthenticated() {
    const user = this.af.auth.currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  flashMessages(msg: string,type: string) {
    this.ngFM.showFlashMessage({
      messages: [msg],
      dismissible: true,
      timeout: 1500,
      // tslint:disable-next-line: object-literal-shorthand
      type: type
    });
  }
}
