import { OrderI } from "./order.interface";

export interface UserOrderI {
    _id: string,
    user: {
        name: string,
        email: string,
        address: string,
        phone: string,
        isadmin: boolean,
        createdAt: string, 
        updatedAt: string,
        token: string,
    },
    order: Array<OrderI>
}