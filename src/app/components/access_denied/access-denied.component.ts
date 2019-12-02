/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  h1: string;
  h2: string;

  constructor() { }

  ngOnInit() {
    this.h1 = '403';
    this.h2 = 'Access Denied!';
  }

}
