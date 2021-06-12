import Web3 from 'web3';
import { Decimal } from 'decimal.js';
import abi from 'human-standard-token-abi';
import { getProvider } from '../../utils/getProvider';
import { getNonce } from './data';
import { ADD_TOKEN, TOKEN_ERROR, TOKEN_ERROR_HIDE, REMOVE_TOKEN, REFRESH_TOKEN_BALANCE, SPIN_REFRESH_ICON_TOKENS } from './actionTypes';

export function addToken(contractAddress) {
    return (dispatch, getState) => {
        const addressOwner = getState().account.address;
        const network = getState().network.infuraNetwork;

        const web3 = new Web3(getProvider(network));
        const contract = new web3.eth.Contract(abi, contractAddress);

        const balance = contract.methods.balanceOf(addressOwner).call();
        const dec = contract.methods.decimals().call();
        const symbol = contract.methods.symbol().call();

        const promise = Promise.all([symbol, balance, dec]);

        promise.then(
            result => {
                const formatBalance = new Decimal(result[1])
                    .dividedBy(Decimal.pow(10, result[2]))
                    .toNumber();

                const value = {
                    symbol: result[0],
                    balance: formatBalance,
                    decimals: result[2],
                    contract: contractAddress
                }

                dispatch({ type: ADD_TOKEN, payload: value });
            },
            error => {
                console.log(error);
                dispatch({ type: TOKEN_ERROR });
            }
        );

    }
}


export function refreshTokensBalance() {
    return (dispatch, getState) => {
        const list = getState().tokens.tokenList;
        const addressOwner = getState().account.address;
        const network = getState().network.infuraNetwork;

        const web3 = new Web3(getProvider(network));

        if (list.length !== 0) {
            const newList = list.map(item => {
                const contract = new web3.eth.Contract(abi, item.contract);
                const balance = contract.methods.balanceOf(addressOwner).call();

                return balance.then(
                    result => {
                        const formatBalance = new Decimal(result)
                            .dividedBy(Decimal.pow(10, item.decimals))
                            .toNumber();
                        return {...item, balance: formatBalance}
                    },
                    error => {
                        console.log(error);
                        return {...item, balance: 'error'}
                    }
                );

            });

            Promise.all(newList).then(result => {
                const object = {list: result, refresh: false}

                dispatch({ type: REFRESH_TOKEN_BALANCE, payload: object });
                dispatch(getNonce());
            });
        }
    }
}


export function removeToken(index) {
    return (dispatch, getState) => {
        const list = getState().tokens.tokenList;
        
        const filtredList = list.filter((item, i) => {
            if (i !== index) {
                return item;
            }
            return false;
        });

        dispatch({ type: REMOVE_TOKEN, payload: filtredList });
    }
}


export function tokenErrorHide() {
    return {
        type: TOKEN_ERROR_HIDE
    }
}


export function spinRefresh() {
    return {
        type: SPIN_REFRESH_ICON_TOKENS
    }
}