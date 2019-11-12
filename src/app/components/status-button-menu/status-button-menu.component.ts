/**
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

    const Svo = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    this.service.getListOfScores().subscribe( res => {

      res.forEach(element => {
        switch(element.type){
          case "Temperature": {
            this.temperature = this.evaluateScore(element.value,0.9,0.8,0.6,0.4);
            break;
          }
          case "Sound": {
            this.sound = this.evaluateScore(element.value,0.8,0.7,0.5,0.3); 
            break;
          }
          case "Light": {
            this.light = this.evaluateScore(element.value,0.7,0.5,0.3,0.1); 
            break;
          }
          case "Seats Available": {
            this.availableSeats = this.evaluateScore(element.value,0.85,0.7,0.55,0.4); 
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

  evaluateScore(score,q1,q2,q3,q4){
    if(score > q1){
      return "very good";
    } else if(score > q2){
      return "good";
    } else if(score > q3){
      return "okay";
    } else if(score > q4){
      return "bad";
    } else {
      return "really bad";
    }
  }

}
