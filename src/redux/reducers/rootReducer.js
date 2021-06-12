import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { networkReducer } from './networkReducer';
import { dataReducer } from './dataReducer';
import { tokensReducer } from './tokensReducer';
import { gasReducer } from './gasReducer';
import { transactionReducer } from './transactionReducer';

export const rootReducer = combineReducers({
    account: accountReducer,
    network: networkReducer,
    data: dataReducer,
    tokens: tokensReducer,
    gas: gasReducer,
    transaction: transactionReducer
});