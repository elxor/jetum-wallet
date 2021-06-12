import React, { useState } from 'react';
import classes from './CreateKeystore.module.scss';
import InputPassword from '../../components/InputPassword/InputPassword';
import Button from '../../components/Button/Button';
import Tooltip from '../../components/Tooltip/Tooltip';
import Loading from '../../components/Loading/Loading';
import DownloadKeystore from '../DownloadKeystore/DownloadKeystore';
import { generateKeystore } from '../../utils/generateKeystore';


const CreateKeystore = () => {

    const [state, setState] = useState({
        isDownloadVisible: false,
        password: '',
        passwordValid: false,
        loading: false,
        fileName: '',
        fileContent: ''
    });

    const passwordValidation = value => {
        if (value.length >= 6) {
            return true;
        }
        return false;
    }

    const inputPasswordHandler = e => {
        const isPasswordValid = passwordValidation(e.target.value);

        setState(state => ({
            ...state,
            password: e.target.value,
            passwordValid: isPasswordValid
        }));
    }

    const generateFileBtnClickHandler = () => {
        setState(state => ({
            ...state,
            loading: true
        }));

        generateKeystore(state.password).then(
            result => {
                const [name, content] = result;

                setState(state => ({
                    ...state,
                    loading: false,
                    isDownloadVisible: true,
                    fileName: name,
                    fileContent: content
                }));
            },
            error => {
                console.log(error);
            }
        );
    }

    if (state.isDownloadVisible) {
        return (
            <DownloadKeystore
                fileName={state.fileName}
                fileContent={state.fileContent}
            />
        );
    }
    return (
        <div className={classes.content}>
            <div className={classes.title}>
                <span>Your Password</span>
                <Tooltip hoverText="This password encrypts your private key. This does not act as a seed to generate your keys." />
            </div>
            <InputPassword
                customClass={classes.inputPassword}
                onChange={inputPasswordHandler}
                placeholder="Please Enter At Least 6 Characters"
                value={state.password}
            />
            {state.loading
                ? <Loading
                    customClass={classes.loading}
                />
                : <Button 
                    disabled={state.passwordValid ? '' : 'disabled'}
                    customClass={classes.button}
                    onClick={generateFileBtnClickHandler}
                >Generate Keystore File</Button>
            }
            <div className={classes.notice}>
				<p><span className={classes.noticeRed}>DO NOT FORGET</span> to save your password. You will need this</p>
                <p><span className={classes.noticeRed}>Password + Keystore </span>
                File to unlock your wallet.</p>
			</div>
        </div>
    );
}

export default CreateKeystore;
