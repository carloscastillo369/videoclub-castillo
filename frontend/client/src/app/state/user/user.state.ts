import { DataUserI } from "src/app/core/interfaces/user.interface";

export interface UserState {
    user: DataUserI | null;
}

export const initialState: UserState = {
    user: null
}