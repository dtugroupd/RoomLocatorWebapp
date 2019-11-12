import { Component, OnInit } from '@angular/core';
import { faMeh, faGrin, faFrown } from '@fortawesome/free-solid-svg-icons';
import { ScadadataService } from  '../../_services/scadadata.service';;


@Component({
  selector: 'app-status-button',
  templateUrl: './status-button.component.html',
  styleUrls: ['./status-button.component.scss']
})

export class StatusButtonComponent implements OnInit {

  faMeh = faMeh;
  faGrin = faGrin;
  faFrown = faFrown;
  smiley = faGrin;
  class = "";
  state = 1;
  score = 1;

  constructor(private service: ScadadataService) {
    
  }

  ngOnInit() {
    this.service.getWeightedScore().subscribe(res => {
        this.score = res;
        if(this.score > 0.55) {
          this.smiley = this.faGrin;
          this.class = "good";
        } else if(this.score > 0.35){
          this.smiley = this.faMeh;
          this.class = "okay";
        } else {
          this.smiley = this.faFrown;
          this.class = "bad";
        } 
      }
    );


   

   
  }

}
