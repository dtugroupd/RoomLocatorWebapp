/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  Login,
  SetTokenAndUser,
  SetIsLoading,
  LoginError,
  Logout,
  LoginSuccess,
  FetchUserSuccess,
  FetchUser,
  FetchUserError
} from "../_actions/token.actions";
import { UserService } from "../_services/user.service";
import {
  User,
  LoginModel,
  AuthenticatedModel,
  Role
} from "../models/login/user.model";
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ErrorModel } from "../models/general/error.model";
import { DeleteMe } from "../_actions/user.actions";

export class TokenStateModel {
  token?: string;
  user: User;
  loginLoading: boolean = false;
  error: ErrorModel;
}

@State<TokenStateModel>({
  name: "token"
})
export class TokenState {
  constructor(private userService: UserService) {}

  @Selector()
  static getToken(state: TokenStateModel): string {
    return state.token;
  }

  @Selector()
  static getUser(state: TokenStateModel): User {
    return state.user;
  }

  @Selector()
  static userIsAdmin(state: TokenStateModel): boolean {
    if (state.user && state.user.roles) {
      return (
        state.user.roles.map(role => role.name).filter(name => name === "admin")
          .length !== 0
      );
    }
    return false;
  }

  @Selector()
  static getUserAdminLocations(state: TokenStateModel): Role[] {
    if (state.user && state.user.roles) {
      return state.user.roles.filter(
        role => role.locationId && role.name === "admin"
      );
    }
  }

  @Selector()
  static getUserResearcherLocations(state: TokenStateModel): Role[] {
    if (state.user && state.user.roles) {
      return state.user.roles.filter(
        role => role.locationId && role.name === "researcher"
      );
    }
  }

  @Selector()
  static loginIsLoading(state: TokenStateModel): boolean {
    return state.loginLoading;
  }

  @Selector()
  static getError(state: TokenStateModel): ErrorModel {
    return state.error;
  }

  @Selector()
  static isAuthenticated(state: TokenStateModel): boolean {
    const jwtHelper = new JwtHelperService();

    return state.token !== null && !jwtHelper.isTokenExpired(state.token);
  }

  @Action(SetTokenAndUser)
  setTokenAndUser({ patchState, setState, dispatch }: StateContext<TokenStateModel>) {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    if (token && jwtHelper.isTokenExpired(token)) {
      patchState({ user: null, loginLoading: false, error: null });
    } else {
      patchState({ token });
      return dispatch(new FetchUser());
    }
  }

  @Action(FetchUser)
  fetchUser( { dispatch }: StateContext<TokenStateModel>) {
    return this.userService.fetchUser().pipe(
      tap((user: User) => {
        dispatch(new FetchUserSuccess(user))
      }, err => {
        dispatch(new FetchUserError(err.error));
      })
    )
  }

  @Action(FetchUserSuccess)
  fetchUserSuccess({patchState}: StateContext<TokenStateModel>, { user }: FetchUserSuccess) {
    patchState({ user, loginLoading: false, error: null });
  }

  @Action(FetchUserError)
  fetchUserError({patchState}: StateContext<TokenStateModel>, { error }: FetchUserError) {
    patchState({ error, loginLoading: false });
  }

  @Action(Login)
  login(
    { patchState, dispatch }: StateContext<TokenStateModel>,
    login: LoginModel
  ) {
    dispatch(new SetIsLoading(true));
    return this.userService.login(login).pipe(
      tap(
        (auth: AuthenticatedModel) => {
          dispatch(new LoginSuccess());
          localStorage.setItem("token", auth.token);
          patchState({ user: auth.user, token: auth.token, error: null });
        },
        x => {
          dispatch(new LoginError(x.error));
        }
      )
    );
  }

  @Action(SetIsLoading)
  setIsLoading(
    { patchState }: StateContext<TokenStateModel>,
    { payload }: SetIsLoading
  ) {
    patchState({
      loginLoading: payload
    });
  }

  @Action(LoginSuccess)
  loginSuccess({ dispatch }: StateContext<TokenStateModel>) {
    dispatch(new SetIsLoading(false));
  }

  @Action(LoginError)
  loginError(
    { patchState, dispatch }: StateContext<TokenStateModel>,
    { payload }: LoginError
  ) {
    patchState({
      error: payload
    });
    dispatch(new SetIsLoading(false));
  }

  @Action(Logout)
  logout(ctx: StateContext<TokenStateModel>) {
    localStorage.removeItem("token");
    return ctx.setState({
      user: undefined,
      token: undefined,
      loginLoading: false,
      error: null
    });
  }

  @Action(DeleteMe)
  deleteMe({ getState, setState }: StateContext<TokenStateModel>) {
    return this.userService.deleteMe().pipe(
      tap(result => {
        const s = getState();
        setState({
          ...s,
          user: result
        });
      })
    );
  }
}
