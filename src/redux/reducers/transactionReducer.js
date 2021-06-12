import { GET_TX_HASH, TX_LOADING, CLEAR_TX_DATA } from '../actions/actionTypes';

const initialState = {
    txHash: '',
    loading: false,
    error: false,
    inputsClear: false
}

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TX_HASH:
            return {
                ...state,
                txHash: action.payload.txHash,
                loading: action.payload.loading,
                error: action.payload.error,
                inputsClear: action.payload.inputsClear
            }
        case TX_LOADING:
            return { ...state, loading: true }
        case CLEAR_TX_DATA:
            return {
                ...state,
                txHash: '',
                error: false,
                inputsClear: false
            }
        default: return state;
    }
}