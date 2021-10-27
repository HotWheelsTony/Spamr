import { createAction, props } from "@ngrx/store";
import { UserRegister } from "src/app/model/user/userRegister";

export const register = createAction('[Register]', props<{userRegister: UserRegister}>());
export const registerSuccess = createAction('[Register] success');
export const registerFailed = createAction('[Register] failed');