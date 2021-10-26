import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../appInitialState";
import { login, loginFailed, loginSuccess } from "./login.actions";
import { LoginState } from "./loginState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState, 
    on(login, currentState => {
        return {
            ...currentState,
            error: null, 
            loggedIn: false,
            loggingIn: true,
        }
    }),
    on(loginSuccess, currentState => {
        return {
            ...currentState,
            loggedIn: true,
            loggingIn: false,
        }
    }),
    on(loginFailed, (currentState, action) => {
        console.log("Login failed reducer");
        return {
            ...currentState,
            error: action.error,
            loggedIn: false,
            loggingIn: false,
        }
    }),

);

export function loginReducer(state: LoginState, action) {
    return reducer(state, action);
}