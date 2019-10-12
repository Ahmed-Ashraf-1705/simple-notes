import { Injectable, Output, EventEmitter } from '@angular/core';
import { Note } from '../classes/note';
import { UserService } from './user.service';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgFlashMessageService } from 'ng-flash-messages';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  userId: string;
  constructor(private http: HttpClient,
              private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private ngFM: NgFlashMessageService) {
    this.afAuth.authState.subscribe( user => {
      if (user) {this.userId = user.uid;}
    });
    }
  newNote(n: Note) {
    let noteList: Array<any> = [];

    // get notes
    this.fetchNotes().subscribe(data => {

      // meege 2 arrays in one array

      if (data != null) {
        noteList = noteList.concat(data);
      }
      n.date = firebase.database.ServerValue.TIMESTAMP;
      noteList.push(n);
      this.db.list('/users/' + this.userId).set('notes', noteList).then( (data) => {
        // show message
        this.ngFM.showFlashMessage({
          messages: ['Note Created Successfully!'],
          type: 'success',
          dismissible: false,
          timeout: 700
        });
      });
    });
  }
  editNote(index, newNote) {
    this.db.list('/users/' + this.userId + '/notes/').set(JSON.stringify(index), newNote).then( (data)=>{ });
  }

  fetchNotes() {
    return this.http.get('https://simplenotes-41471.firebaseio.com/users/' + this.userId + '/notes.json');
  }
  deleteNote(index) {
    let notes: Array<any> = [];
    // get notes
    this.fetchNotes().subscribe( data => {
      notes = notes.concat(data);
      // detach item using its index
      notes.splice(index, 1);

      // resubmit new notes
      this.db.list('/users/' + this.userId).set('notes', notes).then( (data) => {
        // show message
        this.ngFM.showFlashMessage({
          messages: ['Note Created Successfully!'],
          type: 'success',
          dismissible: false,
          timeout: 700
        });
      });

    });
  }
  getNotes() {
    return this.db.database.ref(`users/${this.userId}/notes`);
  }
}
