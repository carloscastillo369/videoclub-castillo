import { UserOrderI } from "src/app/core/interfaces/user-order.interface";
import { MyOrderI } from "src/app/core/interfaces/myorder.interface";

export interface OrdersState {
    orders: UserOrderI[];
    myorders: MyOrderI[] | null;
}

export const initialState: OrdersState = {
    orders: [],
    myorders: null
}