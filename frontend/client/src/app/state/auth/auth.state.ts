import { SignInResponseI } from "src/app/core/interfaces/authResponse.interface";

export interface AuthState {
    data: SignInResponseI | null
}

export const initialState: AuthState = {
    data: null
};