import { NgModule } from "@angular/core";
import {Action, ActionReducer, ActionReducerMap, StoreModule} from "@ngrx/store";


//----------------reducer------------------//
import * as AuthReducer from './reducers/auth.reducer'


//--------------state ---------------------//
import * as UserReducer from './reducers/user.reducer'
import {EffectsModule} from "@ngrx/effects";
import {UserEffects} from "./effects/user.effects";


/**
 * 这就是在Store中显示的结构
 */



interface RootStates{
    user: UserReducer.UserState
}



const reducer :ActionReducerMap<RootStates> = {
    user: UserReducer.userReducer
}


@NgModule({
    imports: [
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([UserEffects])
    ]
  })
  export class AppStoreModule {}
