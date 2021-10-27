import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth/auth.service";
import { register, registerFailed, registerSuccess } from "./register.actions";
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { UserRegister } from "src/app/model/user/userRegister";

@Injectable()
export class RegisterEffects {
 
    constructor(private actions$: Actions, private authService: AuthService) {}

    register$ = createEffect(() => this.actions$.pipe(
        ofType(register),
        switchMap((payload: {userRegister: UserRegister}) => 
            this.authService.register(payload.userRegister).pipe(
                map(() => registerSuccess()),
                catchError(() => of(registerFailed()))
            )
        )
    ));
    
}