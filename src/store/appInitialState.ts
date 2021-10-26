import { AppState } from "./appState";

export const AppInitialState: AppState = {
    loading: {
        show: false,
    },
    login: {
        error: null,
        loggedIn: false,
        loggingIn: false,
        user: null,
    },
}