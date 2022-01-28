import { DataUserI } from "./user.interface";

export interface SignInResponseI {
    token: string,
    dataUser: DataUserI
}

export interface SignUpResponseI {
    msg: string,
    dataUser: DataUserI
}

export interface GetDataUserResponseI {
    token: string,
    dataUser: DataUserI
}