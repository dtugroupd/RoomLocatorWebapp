import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.scss']
})
export class ShowFeedbackComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  
  }

}
