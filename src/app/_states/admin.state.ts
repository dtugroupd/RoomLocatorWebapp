/**
 * @author Hadi Horani, s144885
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/login/user.model';
import { tap } from 'rxjs/operators';
import { GetUsers, UpdateRole, DeleteUser } from '../_actions/admin.actions';
import { AdminService } from '../_services/admin.service';
import { isNgTemplate } from '@angular/compiler';

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

    @Selector()
    static getUsers(state: AdminStateModel) {
        return state.users;
    }
    
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
            const userList = [ ...s.users ];
            const userIndex = userList.findIndex( item => item.studentId === id );
            userList[ userIndex ] = result;
            setState( {
                ...s,
                users: userList
            } );
        } ) );
    }

    @Action( DeleteUser )
    deleteUser ( { getState, setState }: StateContext<AdminStateModel>, { id }: DeleteUser )
    {
        return this.adminService.deleteUser( id ).pipe( tap( () =>
        {
            const s = getState();
            const filteredArray = s.users.filter(item => item.studentId !== id) ;
            setState( {
                ...s,
                users: filteredArray
            } );
        } ) );
    }
}
