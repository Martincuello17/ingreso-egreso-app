import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario;
}

export const initialState: State = {
    user: {} as Usuario,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, { user }) => ({ ...state, user: {...user} })),
    on(unSetUser, (state) => ({ ...state, user: {} as Usuario })),

);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}