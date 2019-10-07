import { Component } from '@angular/core';

@Component({
  selector: 'app-login-button',
  template: `
  <a nbButton href="https://auth.dtu.dk/dtu/?service=http://localhost:4200/" >Login</a>

  <div class="form-group">
                <label class="col-md-4">TicketValue: {{token}}</label>                </div>
`,
  styles: []
})
export class LoginButtonComponent {

 

}
