
// ---- State Interface
import {createReducer, on} from "@ngrx/store";
import * as CartActions from '../actions/cart.actions'
import {state} from "@angular/animations";

export interface CartState {
  items: Array<{ product: Product; quantity: number }>;
  loading: boolean;
  error: string | null;
}

// ---- Initial State
export const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};


export const cartReducer  = createReducer(initialState,
  on(CartActions.loadCart,(state)=>({...state,loading:true}))
  )
