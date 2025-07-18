import {createAction, props} from "@ngrx/store";


export const loadUser = createAction("[User] Load User");
export const loadUserSuccess = createAction('[User] Load User Success', props<{user:any}>());
export const loadUserFailure = createAction('[User] LOad User Failure', props<{error:any}>());
