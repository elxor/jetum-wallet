import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classes from './AccessKeystore.module.scss';
import { getAccoutFromFile } from '../../utils/getAccountFromFile';
import InputFile from '../../components/InputFile/InputFile';
import InputPassword from '../../components/InputPassword/InputPassword';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { getAccount } from '../../redux/actions/account';
import { readFile } from '../../utils/readFile';

const AccessKeystore = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        fileName: 'no file selected',
        fileContent: '',
        password: '',
        valid: {file: false, pass: false},
        loading: false,
        warning: false,
        errorText: ''
    });

    const validation = value => {
        if (value && value !== '') {
            return true;
        } 
        return false;
    }

    const inputFileHandler = e => {
        const file = e.target.files[0];

        const name = file.name.length < 16
            ? file.name
            : file.name.slice(0, 7) + '...' + file.name.slice(-8);


        readFile(file).then(
            result => {
                const isValid = validation(result);

                setState(state => ({
                    ...state,
                    fileName: name,
                    fileContent: result,
                    valid: {...state.valid, file: isValid}
                }));
            }
        );
    }

    const inputPasswordHandler = e => {
        const isValid = validation(e.target.value);

        setState(state => ({
            ...state,
            password: e.target.value,
            valid: {...state.valid, pass: isValid}
        }));
    }

    const mGetAccoutFromFile = useCallback(() => {
        return getAccoutFromFile(state.fileContent, state.password);
    }, [state.fileContent, state.password]);


    useEffect(() => {
        if (state.loading) {
            try {
                const account = mGetAccoutFromFile();
                dispatch(getAccount(account));
            } catch (e) {
                setState(state => ({
                    ...state,
                    loading: false,
                    warning: true,
                    errorText: e.message
                }));
            }
        } 
        return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.loading, mGetAccoutFromFile]);

    const accessBtnClickHandler = () => {
        setState(state => ({...state, loading: true}));
    }

    return (
        <div className={classes.content}>
            <InputFile
                onChange={inputFileHandler}
                name={state.fileName}
            />
            <InputPassword
                customClass={classes.inputPassword}
                onChange={inputPasswordHandler}
                placeholder="Enter Password"
                value={state.password}
            />

            {state.warning && 
                <p className={classes.notice}>
                    Error: {state.errorText}!
                </p>
            }

            {state.loading 
                ? <Loading customClass={classes.loading} />
                : <Button 
                    customClass={classes.button}
                    disabled={state.valid.file && state.valid.pass ? '' : 'disabled'}
                    onClick={accessBtnClickHandler}
                >Access Wallet</Button>
            }
        </div>
    );
}

export default AccessKeystore;