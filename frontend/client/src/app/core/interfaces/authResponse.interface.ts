import { DataUserI } from "./user.interface";

export interface SignInResponseI {
    token: string,
    role: boolean,
    name: string
}

export interface SignUpResponseI {
    msg: string
}

export interface GetDataUserResponseI {
    token: string,
    dataUser: DataUserI
}