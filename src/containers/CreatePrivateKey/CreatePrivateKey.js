import React, { useState, useEffect } from 'react';
import { generatePrivateKey } from '../../utils/generatePrivateKey';
import classes from './CreatePrivateKey.module.scss';
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import CreateSuccess from '../../components/CreateSuccess/CreateSuccess';

const  CreatePrivateKey = () => {

    const [state, setState] = useState({
        modal: false,
        address: '',
        privateKey: ''
    });

    const modalToogleHandler = () => {
        setState(state => ({...state, modal: !state.modal}));
    }

    const randomHandler = () => {
        const account = generatePrivateKey();

        setState(state => ({
            ...state,
            address: account.address,
            privateKey: account.privateKey
        }));
    }

    useEffect(() => {
        const account = generatePrivateKey();

        setState(state => ({
            ...state,
            address: account.address,
            privateKey: account.privateKey
        }));
    }, []);
 
    return (
        <div className={classes.content}>
            <div className={classes.dataRefresh} onClick={randomHandler}>
                <i className={`fa fa-refresh ${classes.iconRefresh}`}></i>
                Random
            </div>
            <div className={classes.item}>
                <p className={classes.title}>Your public address</p>
                <span className="wordwrap">
                    {state.address}
                </span>
                <CopyToClipboard 
                    textToCopy={state.address}
                    customClass={classes.copy}
                    hoverHint={true}
                />
                
            </div>
            <div className={classes.item}>
                <p className={classes.title}>Your private key</p>
                <span className="wordwrap">
                    {state.privateKey}
                </span>
                <CopyToClipboard 
                    textToCopy={state.privateKey}
                    customClass={classes.copy}
                    hoverHint={true}
                />
            </div>

            <Button onClick={modalToogleHandler} customClass={classes.button} disabled="">I Wrote Down My Private Key</Button>

            {state.modal && <Modal onClick={modalToogleHandler}>
                <CreateSuccess />
            </Modal>}
            
            <div className={classes.notice}>
				<p><span className={classes.noticeRed} >DO NOT FORGET</span> to save your private key.</p>
				<p>You will need this to access your wallet.</p>
			</div>

        </div>
    );
}

export default CreatePrivateKey;