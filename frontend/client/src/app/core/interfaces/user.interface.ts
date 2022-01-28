export interface NewUserI {
    name: string,
    email: string,
    password: string,
    address: string,
    phone: number,
    isadmin: boolean
}

export interface RegisteredUserI {
    email: string,
    password: string
}

export interface DataUserI {
    name: string,
    email: string,
    address: string,
    phone: string,
    isadmin: boolean
}
