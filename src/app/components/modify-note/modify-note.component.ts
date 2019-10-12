import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from 'src/app/classes/note';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'sn-modify-note',
  templateUrl: './modify-note.component.html',
  styleUrls: ['./modify-note.component.css']
})
export class ModifyNoteDialog implements OnInit {

  //mode: string = 'view';
  //editText = 'Edit';
  oldNote;

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModifyNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteSrv: NoteService) {}

  ngOnInit() {
    this.form = new FormGroup({
    title: new FormControl({value: this.data.note.title, disabled: (this.data.mode === 'view' ? true : false)}, Validators.required),
    // tslint:disable-next-line: max-line-length
    description: new FormControl({value: this.data.note.description, disabled: (this.data.mode === 'view' ? true : false)}, Validators.required)
    });
  }

  onEdit(f) {
    // change fields to edit mode
    if ( this.data.mode === 'view' && this.data.editText === 'Edit') {

      // save old note
      this.oldNote = f;

      // change text
      this.data.editText = 'Save';
      this.data.mode = 'edit';
      // disabling fields
      this.form.get('title').enable();
      this.form.get('description').enable();

    } else if (this.data.mode === 'edit' && this.data.editText === 'Save'){
      this.data.editText = 'Edit';
      this.data.mode = 'view';

      // disabling fields
      this.form.get('title').disable();
      this.form.get('description').disable();

      // edit code after let user type in these fields
      // action to be done
      const newNote = {
        title: f.title,
        description: f.description,
        date: this.data.note.date
      };

      this.noteSrv.editNote(this.data.noteIndex, newNote);


      this.dialogRef.afterClosed().subscribe( (result) => {
        this.data.note = result;
        // toast message
      });
    } else if (this.data.mode === 'add' && this.data.editText === 'Create') {
      this.form.get('title').enable();
      this.form.get('description').enable();

      // get data and push to db
      this.noteSrv.newNote(f);

      this.dialogRef.close('Created');
    }
  }

  onDelete() {
    // delete code
    this.noteSrv.deleteNote(this.data.noteIndex);
    this.dialogRef.close('Deleted');
    
  }
  onBack(): void{
    this.dialogRef.close('Closed');
  }

}
