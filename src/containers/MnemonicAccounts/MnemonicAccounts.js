import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classes from './MnemonicAccounts.module.scss';
import CustomPath from '../../components/CustomPath/CustomPath';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import SelectAccount from '../SelectAccount/SelectAccount';
import { getAccount } from '../../redux/actions/account';
import { getAccountsFromMnemonic } from '../../utils/getAccountsFromMnemonic';


const MnemonicAccounts = (props) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        isCustomPath: false,
        accounts: '',
        customPath: '',
        path: "m/44'/60'/0'/0",
        pathList: [
            "m/44'/60'/0'/0",
            "m/44'/61'/0'/0",
            "m/44'/60'/0'",
            "m/0'/0'/0'",
            "Custom Path"
        ],
        rangeAccounts: {start: 0, end: 5},
        warning: false,
        errorText: ''
    });

    const [selectedAccount, setSelectedAccount] = useState({
        address: '',
        privateKey: '',
        checked: ''
    });

    const selectPathHandler = e => {
        if (e.target.value === 'Custom Path') {
            setState(state => ({
                ...state,
                isCustomPath: true
            }));
        } else {
            setState(state => ({
                ...state,
                isCustomPath: false,
                path: e.target.value
            }));
        }
    }

    const customPathHandler = e => {
        setState(state => ({
            ...state,
            customPath: e.target.value
        }));
    }

    const setCustomPath = () => {
        const regex = /^(m\/){1}(\d+'{1}\/)+(\d+'{1}\/)+\d+'?$/;
        const isValid = regex.test(state.customPath);

        if (isValid) {
            setState(state => ({
                ...state,
                pathList: [...state.pathList, state.customPath],
                isCustomPath: false,
                customPath: ''
            }));
        }
        else {
            setState(state => ({
                ...state,
                warning: true,
                errorText: 'Invalid Path'
            }));

            setTimeout(() => {
                setState(state => ({
                    ...state,
                    warning: false,
                    errorText: ''
                }));
            }, 3000);
        }
    }

    const prevBtnHandler = () => {
        const num = Number(Object.keys(state.accounts)[0]);

        if (num === 0) {
            return;

        } else {
            const num1 = num - 5;
            const num2 = num1 + 5;

            setState(state => ({
                ...state,
                rangeAccounts: {
                    ...state.rangeAccounts,
                    start: num1,
                    end: num2
                }
            }));
        }
    }

    const nextBtnHandler = () => {
        const num = Number(Object.keys(state.accounts)[0]);

        const num1 = num + 5;
        const num2 = num1 + 5;

        setState(state => ({
            ...state,
            rangeAccounts: {
                ...state.rangeAccounts,
                start: num1,
                end: num2
            }
        }));
    }

    const selectAccountHandler = (i, id) => {
        setSelectedAccount(selectedAccount => ({
            ...selectedAccount,
            address: state.accounts[id].address,
            privateKey: state.accounts[id].privateKey,
            checked: i
        }));
    }

    const buttonClickHandler = () => {
        const account = {
            address: selectedAccount.address,
            privateKey: selectedAccount.privateKey
        }
        dispatch(getAccount(account));
    }
    

    const mGetAccountsFromMnemonic = useCallback(() => {
        return getAccountsFromMnemonic(props.mnemonic, state.path, state.rangeAccounts, props.extraWord);
    }, [props.mnemonic, props.extraWord, state.path, state.rangeAccounts]);
    

    useEffect(() => {
        try {
            const accounts = mGetAccountsFromMnemonic();
            setState(state => ({...state, accounts: accounts}));

            setSelectedAccount(selectedAccount => ({
                ...selectedAccount,
                address: '',
                privateKey: '',
                checked: ''
            }));

        } catch (e) {
            setState(state => ({
                ...state,
                warning: true,
                errorText: e.message
            }));

            setTimeout(() => {
                setState(state => ({
                    ...state,
                    warning: false,
                    errorText: ''
                }));
            }, 3000);
        }
    }, [mGetAccountsFromMnemonic]);

    return (
        <div className={classes.body}>
            <p className={classes.title}>
                Addresses
            </p>

            <div className={classes.path}>
                <p>HD Derivation Path</p>
                <Select
                    onChange={selectPathHandler}
                    customClass={classes.select}
                    options={state.pathList}
                    value={state.path}
                />
            </div>

            {state.isCustomPath &&
                <CustomPath
                    onChange={customPathHandler}
                    addClickHandler={setCustomPath}
                    value={state.customPath}
                />
            }

            {state.warning && 
                <p className={classes.notice}>
                    Error: {state.errorText}!
                </p>
            }

            <SelectAccount
                accounts={state.accounts}
                onChange={selectAccountHandler}
                checked={selectedAccount.checked}
            />

            <div className={classes.nav}>
                <span
                    className={classes.navLeft}
                    onClick={prevBtnHandler}
                >&#60; Prev</span>
				<span
                    className={classes.navRight}
                    onClick={nextBtnHandler}
                >Next &#62;</span>
            </div>

            <Button
                customClass={classes.button}
                onClick={buttonClickHandler}
                disabled={selectedAccount.address ? '' : 'disabled'}
            >
                Access My Wallet
            </Button>
            
        </div>
    );
}

export default MnemonicAccounts;