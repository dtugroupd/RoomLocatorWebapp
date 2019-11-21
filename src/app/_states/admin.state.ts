/**
 * @author Hadi Horani, s144885
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Login } from '../_actions/token.actions';
import { UserService } from '../_services/user.service';
import { User } from '../models/login/user.model';
import { tap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { GetUsers, UpdateRole } from '../_actions/admin.actions';
import { AdminService } from '../_services/admin.service';
import { state } from '@angular/animations';

export class AdminStateModel
{
    users?: User[];
    user: User;
}

@State<AdminStateModel>( {
    name: 'users',
    defaults: {
        users: null,
        user: null
    }
} )
export class AdminState
{
    constructor ( private adminService: AdminService ) { }

    @Action( GetUsers )
    getUsers ( { getState, setState }: StateContext<AdminStateModel> )
    {
        return this.adminService.fetchUsers().pipe( tap( ( result ) =>
        {
            const s = getState();
            setState( {
                ...s,
                users: result,
            } );
        } ) );
    }

    @Action( UpdateRole )
    updateRole ( { getState, setState }: StateContext<AdminStateModel>, { id, roleName }: UpdateRole )
    {
        return this.adminService.updatehUserRole( id, roleName ).pipe( tap( ( result ) =>
        {
            const s = getState();
            setState( {
                ...s,
                user: result,
            } );
        } ) );
    }
}
