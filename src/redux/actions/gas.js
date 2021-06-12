import { GAS_SETTINGS } from '../actions/actionTypes';

export function gasSettings(gas) {
    return {
        type: GAS_SETTINGS,
        payload: gas
    }
}