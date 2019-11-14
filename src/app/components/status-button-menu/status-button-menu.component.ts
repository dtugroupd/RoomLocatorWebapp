/**
 * @author Andreas Gøricke, s153804
 * @author Thomas Lien Christensen, s165242
 */

import { Component, OnInit } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';
import { ScadadataService } from  '../../_services/scadadata.service';;
import { ScadadataScores } from '../../models/sensors/scadadata-scores.model';

@Component({
  selector: 'app-status-button-menu',
  templateUrl: './status-button-menu.component.html',
  styleUrls: ['./status-button-menu.component.scss']
})
export class StatusButtonMenuComponent implements OnInit {

  thumbsUp = thumbsUp;
  thumbsDown = thumbsDown;
  thumbsUpPressed = thumbsUpPressed;
  thumbsDownPressed = thumbsDownPressed;
  upVoted = false;
  downVoted = false;
  temperature = "";
  light = "";
  sound = "";
  availableSeats = "";

  

  constructor(private service: ScadadataService) {
    
  }

  

  ngOnInit() {

    this.service.getStatus().subscribe( res => {

      res.details.forEach(element => {
        switch(element.type){
          case "Temperature": {
            this.temperature = element.value;
            break;
          }
          case "Sound": {
            this.sound = element.value; 
            break;
          }
          case "Light": {
            this.light = element.value; 
            break;
          }
          case "Seats Available": {
            this.availableSeats = element.value; 
            break;
          }
        }
      });
      



    }
  );
  }

  

  upVote() {
    if (this.downVoted === true) {
      this.downVoted = false;
    }

    this.upVoted = !this.upVoted;
  }

  downVote() {
    if (this.upVoted === true) {
      this.upVoted = false;
    }

    this.downVoted = !this.downVoted;
  }

}
