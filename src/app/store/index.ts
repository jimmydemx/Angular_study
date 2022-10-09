import { NgModule } from "@angular/core";
import { ActionReducer, ActionReducerMap, StoreModule } from "@ngrx/store";

//----------------reducer------------------//
import * as AuthReducer from './reducers/auth.reducer'


//--------------state ---------------------//

interface RootStates{
 auth: AuthReducer.authState
}



const reducer :ActionReducerMap<RootStates> = {
    auth: AuthReducer.reducer 
}


@NgModule({
    imports: [
        StoreModule.forRoot(reducer)
 
    ]
  })
  export class AppStoreModule {}