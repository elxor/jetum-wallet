import Web3 from 'web3';
import { getProvider } from '../../utils/getProvider';
import { GET_ETH_PRICE, GET_GAS_PRICE, GET_ETH_BALANCE, GET_NONCE, SPIN_REFRESH_ICON_ETH } from './actionTypes';


export function getEthPrice() {
    return async dispatch => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const result = await response.json();
            dispatch({ type: GET_ETH_PRICE, payload: result.ethereum.usd });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_ETH_PRICE, payload: 'error' });
        }
    }
}

export function getGasPrice(network) {
    return dispatch => {
        const web3 = new Web3(getProvider(network));

        web3.eth.getGasPrice().then(
            result => {
                const gas = web3.utils.fromWei(result, 'gwei');
                dispatch({ type: GET_GAS_PRICE, payload: Math.ceil(gas) });
            },
            error => {
                console.log(error);
                dispatch({ type: GET_GAS_PRICE, payload: 'error' });
            }
        );
    }
}

export function getEthBalance(network) {
    return (dispatch, getState) => {
        const web3 = new Web3(getProvider(network));

        const address = getState().account.address;

        web3.eth.getBalance(address).then(
            result => {
                const balance = web3.utils.fromWei(result, "ether");

                const object = {balance, refresh: false}

                dispatch({ type: GET_ETH_BALANCE, payload: object });
                dispatch(getNonce());
            },
            error => {
                console.log(error);

                const object = {balance: 'error', refresh: false}

                dispatch({ type: GET_ETH_BALANCE, payload: object });
                dispatch(getNonce());
            }
        );
    }
}

export function getNonce() {
    return (dispatch, getState) => {
        const network = getState().network.infuraNetwork;
        const address = getState().account.address;

        const web3 = new Web3(getProvider(network));

        web3.eth.getTransactionCount(address).then(
            result => {
                dispatch({ type: GET_NONCE, payload: result });
            },
            error => {
                console.log(error);
            }
        );
    }
}

export function spinRefresh() {
    return {
        type: SPIN_REFRESH_ICON_ETH
    }
}