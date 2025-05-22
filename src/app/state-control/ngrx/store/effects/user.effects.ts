import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from '../actions/user.actions'
import {catchError, map, mergeMap, of} from "rxjs";
import {NgrxUserService} from "../../services/ngrx-user.service";

@Injectable()
export class  UserEffects{

  loadUser$ = createEffect(()=>
    this.actions$.pipe(ofType(UserActions.loadUser),
    mergeMap(()=>this.userService.getUser().pipe(
      map(user=>UserActions.loadUserSuccess({user})),
      catchError(error=>of(UserActions.loadUserFailure({error})))
  ))))


  constructor(private actions$:Actions,private userService:NgrxUserService) {
  }

}
