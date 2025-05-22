import {createReducer, on} from "@ngrx/store";
import * as UserActions from '../actions/user.actions'

export interface UserState{
  user: string;
  loading:boolean;
  error: any;
}

const initialSate: UserState={
  user: '',
  loading: false,
  error:null
}


export const userReducer = createReducer(
  initialSate,
  on(UserActions.loadUser, state=>({...state,loading:true})),
  on(UserActions.loadUserSuccess,(state,{user})=>({...state,user,loading:false})),
  on(UserActions.loadUserFailure,(state,{error})=>({...state,error,loading:false}))
)
