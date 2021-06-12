import { ACCOUNT_ACCESS, ACCOUNT_LOGOUT } from '../actions/actionTypes';

const initialState = {
    address: '',
    privateKey: '',
    accountAccess: false
}

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_ACCESS:
            return {
                ...state,
                accountAccess: true,
                address: action.payload.address,
                privateKey: action.payload.privateKey
            }
        case ACCOUNT_LOGOUT:
            return {
                ...state,
                accountAccess: false,
                address: '',
                privateKey: ''
            }
        default: return state;
    }
}