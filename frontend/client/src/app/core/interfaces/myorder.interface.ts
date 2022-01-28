import { OrderI } from "./order.interface";

export interface MyOrderI {
    total: number,
    order: Array<OrderI>
}