import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../appInitialState";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./loadingState";

const initialState: LoadingState = AppInitialState.loading;

const reducer = createReducer(
    initialState,
    on(show, () => {
        return {show: true};
    }),
    on(hide, () => {
        return {show: false};
    }),
);

export function loadingReducer(state, action) {
    return reducer(state, action)
}