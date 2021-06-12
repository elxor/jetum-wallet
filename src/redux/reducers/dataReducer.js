import { GET_GAS_PRICE, GET_ETH_PRICE, GET_ETH_BALANCE, GET_NONCE, SPIN_REFRESH_ICON_ETH } from '../actions/actionTypes';

const initialState = {
    ethBalance: 0,
    usdPrice: 0,
    gasPrice: 0,
    nonce: '',
    spinRefresh: false
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAS_PRICE:
            return { ...state, gasPrice: action.payload }
        case GET_ETH_PRICE:
            return { ...state, usdPrice: action.payload }
        case GET_ETH_BALANCE:
            return {
                ...state,
                ethBalance: action.payload.balance,
                spinRefresh: action.payload.refresh
            }
        case GET_NONCE:
            return {
                ...state,
                nonce: action.payload
            }
        case SPIN_REFRESH_ICON_ETH:
            return { ...state, spinRefresh: true }
        default: return state;
    }
}