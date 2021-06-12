import React, { useState } from 'react';
import Web3 from 'web3';
import { isValidPrivate } from 'ethereumjs-util';
import { useDispatch } from 'react-redux';
import classes from './AccessPrivateKey.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { getAccount } from '../../redux/actions/account';
import { getAccountFromPrivateKey } from '../../utils/getAccountFromPrivateKey';


const AccessPrivateKey = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        privateKey: '',
        valid: false,
        warning: false
    });

    const validationPrivateKey = value => {
        const withoutPrefix = Web3.utils.stripHexPrefix(value);
        const lengthValid = withoutPrefix.length === 64;

        if (Web3.utils.isHex(value) && lengthValid) {
            const valid = isValidPrivate(Buffer.from(withoutPrefix, 'hex'));
            return valid;
        }
        return false;
    }

    const inputHandler = e => {
        const isValid = validationPrivateKey(e.target.value);

        setState(state => ({
            ...state,
            privateKey: e.target.value,
            valid: isValid
        }));
    }

    const clickHandler = () => {
        try {
            const account = getAccountFromPrivateKey(state.privateKey);
            dispatch(getAccount(account));

        } catch (e) {
            setState(state => ({...state, warning: true}));
        }
    }

    return (
        <div className={classes.content}>
            <p className={classes.title}>
                Please type in your private key
            </p>
            <Input
                customClass={classes.input}
                onChange={inputHandler}
                placeholder="Private key"
                value={state.privateKey}
            />
            {state.warning && 
                <p className={classes.notice}>
                    Error: Invalid Private Key!
                </p>
            }
            <Button 
                customClass={classes.button}
                disabled={state.valid ? '' : 'disabled'}
                onClick={clickHandler}
            >Access Wallet</Button>
        </div>
    );
}

export default AccessPrivateKey;