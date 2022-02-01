import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

//Servicio de carrito
import { CartService } from 'src/app/services/cart.service';

//NgRx
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromCartActions from "./cart.actions";


@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private _cartService: CartService
    ) {}

    //effect obtener carrito
    loadCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.loadCart),
            map((action) => {
                const cart = this._cartService.getCartFromLocalStorage();
                return fromCartActions.loadCartSuccess({cart});
            })
        );
    });

    //effect agregar una película al carrito
    addCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.addCart), 
            map((action) => {
                const item = action.item;
                this._cartService.addMovieToCart(action.item);
                return fromCartActions.addCartSuccess({ item });
            })
        );
    });

    //effect eliminar una película del carrito
    deleteItemCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.deleteItemCart), 
            map((action) => {
                this._cartService.deleteCartItem(action.id);
                return fromCartActions.deleteItemCartSuccess({ id: action.id })
            })
        );
    });

    //effect eliminar el carrito
    deleteCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.deleteCart), 
            map((action) => {
                this._cartService.removeAllCart();
                return fromCartActions.deleteCartSuccess({cart: []});
            })
        );
    });

    //effect aumentar la cantidad de días de alquiler de una película del carrito
    increaseDaysItemCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.increaseDaysItemCart), 
            map((action) => {
                this._cartService.increaseQtyMovie(action.id);
                return fromCartActions.increaseDaysItemCartSuccess({ id: action.id })
            })
        );
    });

    //effect disminuir la cantidad de días de alquiler de una película del carrito
    decreaseDaysItemCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.decreaseDaysItemCart), 
            map((action) => {
                this._cartService.decreaseQtyMovie(action.id);
                return fromCartActions.decreaseDaysItemCartSuccess({ id: action.id })
            })
        );
    });

    //effect cambiar la cantidad de días de alquiler de una película del carrito
    changeDaysItemCart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCartActions.changeDaysItemCart), 
            map((action) => {
                this._cartService.changeQtyMovie(action.id, action.days);
                return fromCartActions.changeDaysItemCartSuccess({ id: action.id, days: action.days })
            })
        );
    });

}
