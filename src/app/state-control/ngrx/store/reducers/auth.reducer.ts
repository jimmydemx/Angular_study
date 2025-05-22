import { Action, createReducer,on } from "@ngrx/store";
import * as AuthActions from '../actions/auth.action'



export interface authState{
    username: string;
    email: string;
    password:string;
}

const initialState ={
    username:'',
    email:'',
    password:''



}


// export const State:authState ={
//     username: 
//     e

// }


const AuthReducer = createReducer(
    initialState,
    on(AuthActions.QUOTE_SUCCESS, (state)=> ({ ...state})),
);

export function reducer(state: authState | undefined, action: Action) {
    return AuthReducer(state, action);
}