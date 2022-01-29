import { UserOrderI } from "src/app/core/interfaces/user-order.interface";

export interface OrdersState {
    orders: UserOrderI[];
}

export const initialState: OrdersState = {
    orders: []
}