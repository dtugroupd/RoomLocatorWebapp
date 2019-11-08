
/** * 

 @author Hamed Kadkhodaie, s083485

*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faThumbsUp as thumbsUpPressed, faThumbsDown as thumbsDownPressed } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbsUp, faThumbsDown as thumbsDown } from '@fortawesome/free-regular-svg-icons';
import { SetFeedback } from '../../_actions/feedback.action';
import { Store } from '@ngxs/store';



 @Component({
  selector: 'app-status-button-menu',
  templateUrl: './status-button-menu.component.html',
  styleUrls: ['./status-button-menu.component.scss']
}) 
export class StatusButtonMenuComponent implements OnInit{

  constructor(private store: Store) { }
  
  thumbsDown = thumbsDown; // defining objects
  thumbsDownPressed = thumbsDownPressed;
  thumbsUp = thumbsUp;
  thumbsUpPressed = thumbsUpPressed;
 
  upVoted = false;  // setting initial value for object like/dislike
  downVoted = false;

   @Output()
   countThumbpsupChanged: EventEmitter<boolean> = new EventEmitter<boolean>(); //register event with a value of boolean
   
   @Output()
   countThumbpsdownChanged: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  
  onThumbsupChanged(upVoted,downVoted){ 
    if (this.downVoted === true){
      this.downVoted = false;
    }

    this.countThumbpsupChanged.emit(this.upVoted=true); // metoden sætter ændringens værdi
    this.store.dispatch(new SetFeedback({upVotedFeedback: upVoted, downVotedFeedback:downVoted})) // Store-service til at påkalde 
                                                                                                  //dispatch med en action eller array af action som man vil udløse(trigger)
   
  }
 
  onThumbsdownChanged(upVoted,downVoted){
    if (this.upVoted === true) {
      this.upVoted = false;
    }

    this.countThumbpsdownChanged.emit(this.downVoted=true);   
    this.store.dispatch(new SetFeedback({upVotedFeedback: upVoted, downVotedFeedback:downVoted}))
    
  }

  ngOnInit() {
  }

}
