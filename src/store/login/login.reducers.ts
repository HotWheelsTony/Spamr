import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../appInitialState";
import { login, loginFailed, loginSuccess, logout } from "./login.actions";
import { LoginState } from "./loginState";


const reducer = createReducer(AppInitialState.login, 
    on(login, currentState => {
        return {
            ...currentState,
            error: null, 
            loggedIn: false,
            loggingIn: true,
            loggedOut: true,
        }
    }),
    on(loginSuccess, currentState => {
        return {
            ...currentState,
            loggedIn: true,
            loggingIn: false,
            loggedOut: false,
        }
    }),
    on(loginFailed, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            loggedIn: false,
            loggingIn: false,
            loggedOut: true,
        }
    }),
    on(logout, currentState => {
        return {
            ...currentState,
            loggedIn: false,
            loggingIn: false,
            loggedOut: true,
        }
    }),

);

export function loginReducer(state: LoginState, action) {
    return reducer(state, action);
}