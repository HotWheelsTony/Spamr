import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user";

export const login = createAction("[Login", props<{email: string, password: string}>());
export const loginSuccess = createAction("[Login] success", props<{user: User}>());
export const loginFailed = createAction("[Login] fail", props<{error: any}>());