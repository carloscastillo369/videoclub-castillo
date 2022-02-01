import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

//NgRx
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addCart, addCartSuccess, deleteCart, deleteCartSuccess, deleteItemCart, deleteItemCartSuccess, loadCart, loadCartSuccess } from "./cart.actions";
import { CartService } from 'src/app/services/cart.service';



@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private _cartService: CartService
    ) {}

    //effect obtener carrito
    loadCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadCart),
            map((action) => {
                const cart = this._cartService.getCartFromLocalStorage();
                return loadCartSuccess({cart});
            })
        );
    });

    //effect agregar una película al carrito
    addCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addCart), 
            map((action) => {
                const item = action.item;
                this._cartService.addMovieToCart(action.item);
                return addCartSuccess({ item });
            })
        );
    });

    //effect eliminar una película del carrito
    deleteItemCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteItemCart), 
            map((action) => {
                this._cartService.deleteCartItem(action.id);
                return deleteItemCartSuccess({ id: action.id })
            })
        );
    });

    //effect eliminar el carrito
    deleteCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteCart), 
            map((action) => {
                this._cartService.removeAllCart();
                return deleteCartSuccess();
            })
        );
    });

}
