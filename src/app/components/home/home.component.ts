import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Simple Notes App';
  constructor() { }

  ngOnInit() {
  }

}
