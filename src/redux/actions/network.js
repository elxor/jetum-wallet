import { CHANGE_NETWORK } from './actionTypes';

export function changeNetwork(network) {
    return {
        type: CHANGE_NETWORK,
        payload: network
    }
}