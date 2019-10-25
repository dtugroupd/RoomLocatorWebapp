import { Component, OnInit } from '@angular/core';
import { faMeh, faGrin, faFrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status-button',
  templateUrl: './status-button.component.html',
  styleUrls: ['./status-button.component.scss']
})
export class StatusButtonComponent implements OnInit {

faMeh = faMeh;
faGrin = faGrin;
faFrown = faFrown;

  constructor() { }

  ngOnInit() {
  }

}
