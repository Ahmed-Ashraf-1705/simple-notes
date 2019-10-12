import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/classes/note';
import { MatDialog } from '@angular/material';
import { ModifyNoteDialog } from '../modify-note/modify-note.component';

@Component({
  selector: 'sn-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Input() noteIndex;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyNoteDialog, {
      width: '400px',
      height: '420px',
      data: {note: this.note, mode: 'view', editText: 'Edit', noteIndex: this.noteIndex},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Closed') {
        return;
      }
      if (result === 'Edited') {
        // display toast
      }
    });
  }

  onLogout() {

  }

}
