import {createAction, props} from "@ngrx/store";


/**
 * export type ActionCreator<T,C> = C & TypedAction<T>
 */

export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction('[Cart] Load Cart Successful', props<{cart:any}>())


export const addItemToCart =  createAction('[Cart] Add item',props<{item:string}>())
export const removeItemFromCart = createAction('[Cart] remove item',props<{itemID:number}>())
export const clearCart = createAction('[Cart] clear cart')
