/**
 * @author Andreas Gøricke, s153804
 */

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

  constructor(private service: ScadadataService) {
    
  }

  ngOnInit() {
    this.service.getStatus().subscribe(res => {
      this.class = res.status;
        if(res.status = "good") {
          this.smiley = this.faGrin;
        } else if(res.status = "okay"){
          this.smiley = this.faMeh;
        } else {
          this.smiley = this.faFrown;
        } 
      }
    );


   

   
  }

}
