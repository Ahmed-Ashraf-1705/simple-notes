import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/classes/note';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { ModifyNoteDialog } from '../modify-note/modify-note.component';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'sn-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor(private userSrv: UserService,
              private router: Router,
              private noteSrv: NoteService,
              public dialog: MatDialog,
              private ngFM: NgFlashMessageService) { }
  // note sync
  notes;
  ngOnInit() {
    // this.noteSrv.fetchNotes().subscribe( (data: any) => {this.notes = data;} )
    this.noteSrv.fetchNotes().subscribe( (res) => {
      this.notes = res;
      this.noteSrv.getNotes().on('value', (snap) => {
        this.notes = snap.val();
      });
    });
  }

  onLogout() {
    this.userSrv.logout();
    this.router.navigate(['/home']);
  }

  onAdd() {
    const dialogRef = this.dialog.open(ModifyNoteDialog, {
      width: '400px',
      height: '420px',
      data: {note: new Note('', firebase.database.ServerValue.TIMESTAMP, ''), mode : 'add', editText: 'Create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Closed') {
        return;
      }
      if (result === 'Edited') {
        // display toast
        this.ngFM.showFlashMessage({
          messages: ['Note Edited Successfully!'],
          dismissible: false,
          timeout: 400,
          type: 'success'
        });
      }
    });

  }

}
