import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Note } from 'src/app/classes/note';
import * as firebase from 'firebase';

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private userSrv: UserService,
              private db: AngularFireDatabase,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      // tslint:disable-next-line: max-line-length
      email : new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(f: any) {
    const user: User = {
      email: f.email,
      password: f.password
    }
    this.userSrv.register(user).then( (result) => {
      // const note: Note[] = [{ title: 'first note', description: 'your description', date: firebase.database.ServerValue.TIMESTAMP}];
      this.userSrv.writeToDB();
      // flash messages
      this.userSrv.flashMessages('User Registered Successfuly! You will be automatically redirected to sign in page', 'success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }).catch( (err: any) => {
      console.log(err.message)
      if ( err.code === 'auth/email-already-in-use') {
        this.userSrv.flashMessages(err.message, 'danger');
      }
    } );
  }

}
