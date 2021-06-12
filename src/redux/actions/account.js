import { ACCOUNT_ACCESS, ACCOUNT_LOGOUT } from './actionTypes';

export function getAccount(account) {
    return {
        type: ACCOUNT_ACCESS,
        payload: account
    }
}

export function logoutAccount() {
    return {
        type: ACCOUNT_LOGOUT
    }
}