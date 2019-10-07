import { State, Action, Selector } from '@ngxs/store';
import { Token } from '../models/login.model';
import { GetTokenValue } from '../actions/login.action';
import { AppComponent } from '../app.component';


function getToken() {
    let ticketVal: string = null;
    if (location.search) {
      ticketVal = location.href.split('=').pop();
    }

    console.log('TicketValue: ' + ticketVal);
    return ticketVal;

  }

export class LoginStateModel {
    tokens: Token[];
}

@State<LoginStateModel>({
    name: 'tokens',
    defaults: {
        tokens: []
    }
})


export class LoginState {

    @Selector()
    static getTokenValues(state: LoginStateModel) {
        return state.tokens;
    }

    @Action(GetTokenValue)
    getTokenValue() {
        getToken();
    }
}


