import { ADD_TOKEN, TOKEN_ERROR, TOKEN_ERROR_HIDE, REMOVE_TOKEN, REFRESH_TOKEN_BALANCE, SPIN_REFRESH_ICON_TOKENS } from '../actions/actionTypes';

const initialState = {
    tokenList: [],
    tokenError: false,
    spinRefresh: false
}

export const tokensReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                tokenList: [
                    ...state.tokenList,
                    action.payload
                ],
                tokenError: false
            }
        case TOKEN_ERROR:
            return {
                ...state,
                tokenError: true
            }
        case TOKEN_ERROR_HIDE:
            return {
                ...state,
                tokenError: false
            }
        case REMOVE_TOKEN:
            return {
                ...state,
                tokenList: [
                    ...action.payload
                ]
            }
        case REFRESH_TOKEN_BALANCE:
            return {
                ...state,
                tokenList: [
                    ...action.payload.list
                ],
                spinRefresh: action.payload.refresh
            }
        case SPIN_REFRESH_ICON_TOKENS:
            return { ...state, spinRefresh: true }
        default: return state;
    }
}