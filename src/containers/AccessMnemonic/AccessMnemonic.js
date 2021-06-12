import React, { useState } from 'react';
import * as bip39 from 'bip39';
import classes from './AccessMnemonic.module.scss';
import SwitchButton from '../../components/SwitchButton/SwitchButton';
import SeedList from '../../components/SeedList/SeedList';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import MnemonicAccounts from '../MnemonicAccounts/MnemonicAccounts';
import ExtraWord from '../../components/ExtraWord/ExtraWord';
import { objectToStringWords } from '../../utils/helpers';


const AccessMnemonic = () => {

    const [state, setState] = useState({
        switcher: false,
        warning: false,
        modal: false,
        mnemonicWords: '',
        extraWord: ''
    });

    const [inputWords, setInputWords] = useState({});

    const switchHandler = () => {
        setState(state => ({
            ...state,
            switcher: !state.switcher
        }));
    }

    const seedListHandler = e => {
        setInputWords(inputWords => ({
            ...inputWords,
            [e.target.dataset.id]: e.target.value
        }));
    }

    const clickHandler = () => {
        const mnemonic = objectToStringWords(inputWords, state.switcher);
        const valid = bip39.validateMnemonic(mnemonic);

        if (!valid) {
            setState(state => ({...state, warning: true}));
        } else {
            setState(state => ({
                ...state,
                modal: true,
                mnemonicWords: mnemonic,
                warning: false
            }));
        }
    }

    const modalToogleHandler = () => {
        setState(state => ({...state, modal: !state.modal}));
    }

    const extraWordInputHandler = e => {
        setState(state => ({...state, extraWord: e.target.value}));
    }

    const clearExtraWordInput = () => {
        setState(state => ({...state, extraWord: ''}));
    }

    return (
        <div className={classes.content}>
            <p className={classes.title}>
                Please type in your mnemonic phrase
            </p>
            <div className={classes.body}>
                <div className={classes.switchWrapper}>
                    <SwitchButton
                        checked={state.switcher}
                        onChange={switchHandler}
                    />
                    <span className={classes.switchButtonSpan}>Value</span>
                </div>
                <SeedList
                    inputs={state.switcher ? 24 : 12}
                    onChange={seedListHandler}
                />

                <ExtraWord
                    page={false}
                    onChange={extraWordInputHandler}
                    value={state.extraWord}
                    clearValue={clearExtraWordInput}
                />
            </div>

            {state.warning && 
                <p className={classes.notice}>
                    Error: Invalid Mnemonic Phrase!
                </p>
            }

            <Button
                customClass={classes.button}
                onClick={clickHandler}
            >Access Wallet</Button>

            {state.modal && <Modal onClick={modalToogleHandler}>
                <MnemonicAccounts
                    mnemonic={state.mnemonicWords}
                    extraWord={state.extraWord}
                />
            </Modal>}
        </div>
    );
}

export default AccessMnemonic;
