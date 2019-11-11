import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: ``,
  styles: ['span { color: green;' ]
})

export class LoginComponent implements OnInit {
  
  constructor() {
   window.location.href = 'https://auth.dtu.dk/dtu/?service=https://localhost:5001/api/v1/auth/validate';
  }

  ngOnInit() {
  }
}
