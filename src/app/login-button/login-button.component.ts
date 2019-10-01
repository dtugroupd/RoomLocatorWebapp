import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-button',
  template: `
  <a nbButton href="https://auth.dtu.dk/dtu/?service={{serviceUrl}}" >Login</a>
  `,
  styles: []
})
export class LoginButtonComponent {
  serviceUrl: string;

  constructor() {
    // this.serviceUrl = `${environment.frontendUrl}/validate`;
    this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`
    //https://localhost:5001/api/v1/auth/validate
  }
 

}
