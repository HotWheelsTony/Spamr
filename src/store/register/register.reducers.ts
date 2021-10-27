import { createReducer, on, State } from "@ngrx/store";
import { AppInitialState } from "../appInitialState";
import { register, registerFailed, registerSuccess } from "./register.actions";
import { RegisterState } from "./registerState";


const reducer = createReducer(AppInitialState.register,
    on(register, state => {
        return {
            ...state,
            registered: false,
            registering: true,
        }
    }),
    on(registerSuccess, state => {
        return {
            ...state,
            registered: true,
            registering: false,
        }
    }),
    on(registerFailed, state => {
        return {
            ...state,
            registered: false,
            registering: false,
        }
    }),
);

export function registerReducer(state: RegisterState, action) {
    return reducer(state, action);
}