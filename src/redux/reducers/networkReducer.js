import { CHANGE_NETWORK } from '../actions/actionTypes';

const initialState = {
    infuraNetwork: 'mainnet'
}

export const networkReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NETWORK:
            return { ...state, infuraNetwork: action.payload }
        default: return state;
    }
}