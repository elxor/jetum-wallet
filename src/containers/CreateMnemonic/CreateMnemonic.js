import React, { useState, useEffect } from 'react';
import classes from './CreateMnemonic.module.scss';
import { generateMnemonic } from '../../utils/generateMnemonic';
import Tooltip from '../../components/Tooltip/Tooltip';
import SwitchButton from '../../components/SwitchButton/SwitchButton';
import SeedList from '../../components/SeedList/SeedList';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import VerifyMnemonic from '../VerifyMnemonic/VerifyMnemonic';
import ExtraWord from '../../components/ExtraWord/ExtraWord';


const CreateMnemonic = () => {
  
    const [state, setState] = useState({
        switcher: false,
        modal: false,
        mnemonic: [],
        extraWord: ''
    });

    const switchHandler = () => {
        setState(state => ({
            ...state,
            switcher: !state.switcher
        }));
    }

    const modalToogleHandler = () => {
        setState(state => ({...state, modal: !state.modal}));
    }

    const randomHandler = () => {
        const mnemonicPhrase = generateMnemonic(state.switcher);
        setState(state => ({
            ...state, 
            mnemonic: mnemonicPhrase
        }));
    }

    const extraWordInputHandler = e => {
        setState(state => ({
            ...state,
            extraWord: e.target.value
        }));
    }

    const clearExtraWordInput = () => {
        setState(state => ({...state, extraWord: ''}));
    }

    useEffect(() => {
        const mnemonicPhrase = generateMnemonic(state.switcher);
        setState(state => ({...state, mnemonic: mnemonicPhrase}));
    }, [state.switcher]);

    return (
        <div className={classes.content}>
            <div className={classes.title}>
                <span>Your Mnemonic Phrase</span>
                <Tooltip hoverText="A mnemonic phrase is a list of 12-24 words that can be used to access your wallet." />
            </div>

            <div className={classes.body}>
                <div className={classes.control}>
                    <div className={classes.switchWrapper}>
                        <SwitchButton
                            checked={state.switcher}
                            onChange={switchHandler}
                        />
                        <span className={classes.switchButtonSpan}>Value</span>
                    </div>
                    <div className={classes.dataRefresh} onClick={randomHandler}>
                        <i className={`fa fa-refresh ${classes.iconRefresh}`}></i>
                        Random
                    </div>
                </div>
                <SeedList array={state.mnemonic} />

                <ExtraWord
                    page={true}
                    onChange={extraWordInputHandler}
                    value={state.extraWord}
                    clearValue={clearExtraWordInput}
                />
            </div>

            <Button onClick={modalToogleHandler} customClass={classes.button}>I Wrote Down My Phrase</Button>

            {state.modal && <Modal onClick={modalToogleHandler}>
                <VerifyMnemonic
                    array={state.mnemonic}
                    extraWord={state.extraWord}
                />
            </Modal>}

            <div className={classes.notice}>
				<p><span className={classes.noticeRed} >DO NOT FORGET</span> to save your mnemonic phrase.</p>
				<p>You will need this to access your wallet.</p>
			</div>

        </div>
    );
}

export default CreateMnemonic;
