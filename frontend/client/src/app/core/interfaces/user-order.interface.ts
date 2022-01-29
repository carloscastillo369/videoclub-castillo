import { OrderI } from "./order.interface";
import { DataUserI } from './user.interface';

export interface UserOrderI {
    _id: string,
    user: DataUserI,
    order: Array<OrderI>
}