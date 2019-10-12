import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private userSrv: UserService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      // tslint:disable-next-line: max-line-length
      email: new FormControl('',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }
  onSubmit(user: User) {
    // code here
    this.userSrv.login(user).then( (res) => {
      this.userSrv.flashMessages('Successfuly Signed In! you will be redirected after 3 seconds', 'success');
      setTimeout(() => {
        this.router.navigate(['/notes']);
      }, 3000);
    } ).catch( (err) => {
      this.userSrv.flashMessages(err.message, 'danger');
    });
  }

}
