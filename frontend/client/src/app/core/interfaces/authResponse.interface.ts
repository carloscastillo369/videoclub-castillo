import { DataUserI } from "./user.interface";

export interface SignInResponseI {
    token: string,
    isadmin: boolean,
    name: string,
    email: string
}

export interface SignUpResponseI {
    msg: string
}

export interface GetDataUserResponseI {
    token: string,
    dataUser: DataUserI
}