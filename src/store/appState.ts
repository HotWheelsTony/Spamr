import { LoadingState } from "./loading/loadingState";
import { LoginState } from "./login/loginState";
import { RegisterState } from "./register/registerState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
    register: RegisterState;
}