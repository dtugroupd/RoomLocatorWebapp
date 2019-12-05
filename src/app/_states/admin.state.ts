/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/login/user.model';
import { tap } from 'rxjs/operators';
import { GetUsers, UpdateRole, DeleteUser, GetUsersSuccess } from '../_actions/admin.actions';
import { AdminService } from '../_services/admin.service';

export class AdminStateModel {
    users?: User[];
    user: User;
}

@State<AdminStateModel>({
    name: 'users',
    defaults: {
        users: null,
        user: null
    }
})
export class AdminState {
    constructor(private adminService: AdminService) { }

    @Selector()
    static getUsers(state: AdminStateModel) {
        return state.users;
    }

    @Action(GetUsers)
    getUsers({ dispatch }: StateContext<AdminStateModel>) {
        return this.adminService.fetchUsers().pipe(tap((result) => {
            dispatch(new GetUsersSuccess(result));
        }));
    }

    @Action(GetUsersSuccess)
    getUsersSuccess({ getState, setState }: StateContext<AdminStateModel>, { users }) {
        const state = getState();
        setState({
            ...state, users
        });
    }

    @Action(UpdateRole)
    updateRole({ getState, setState }: StateContext<AdminStateModel>, { id, roleName }: UpdateRole) {
        return this.adminService.updatehUserRole(id, roleName).pipe(tap((result) => {
            const s = getState();
            const userList = [...s.users];
            const userIndex = userList.findIndex(item => item.studentId === id);
            userList[userIndex] = result;
            setState({
                ...s,
                users: userList
            });
        }));
    }

    @Action(DeleteUser)
    deleteUser({ getState, setState }: StateContext<AdminStateModel>, { id }: DeleteUser) {
        return this.adminService.deleteUser(id).pipe(tap(() => {
            const s = getState();
            const filteredArray = s.users.filter(item => item.studentId !== id);
            setState({
                ...s,
                users: filteredArray
            });
        }));
    }
}
