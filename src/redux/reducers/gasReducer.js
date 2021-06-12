import { GAS_SETTINGS } from '../actions/actionTypes';

const initialState = {
    maxGasPrice: 500,
    maxGasLimit: 500000
}

export const gasReducer = (state = initialState, action) => {
    switch (action.type) {
        case GAS_SETTINGS:
            return {
                ...state,
                maxGasPrice: action.payload.gasPrice,
                maxGasLimit: action.payload.gasLimit
            }
        default: return state;
    }
}