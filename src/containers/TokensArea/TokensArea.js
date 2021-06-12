import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import classes from './TokensArea.module.scss';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import TokenList from '../../components/TokenList/TokenList';
import { addToken, tokenErrorHide, refreshTokensBalance, spinRefresh } from '../../redux/actions/tokens';


const TokensArea = () => {

    const [state, setState] = useState({
        inputVisible: false,
        contract: '',
        contractValid: false,
        spin: false,
        hideInputAfterSave: false,
        warning: false
    });

    const dispatch = useDispatch();

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    const tokenError = useSelector(reduxState => {
        return reduxState.tokens.tokenError;
    });

    const tokenList = useSelector(reduxState => {
        return reduxState.tokens.tokenList;
    });

    const refresh = useSelector(reduxState => {
        return reduxState.tokens.spinRefresh;
    });

    const addTokensHandler = () => {
        dispatch(tokenErrorHide());

        setState(state => ({
            ...state,
            inputVisible: !state.inputVisible,
            warning: false
        }));
    }

    const inputContractHandler = e => {
        const valid = Web3.utils.isAddress(e.target.value);

        setState(state => ({
            ...state,
            contract: e.target.value,
            contractValid: valid,
        }));
    }

    const saveButtonHandler = () => {
        const isTokenAdded = tokenList
            .find(item => item.contract === state.contract);

        if (!isTokenAdded) {
            dispatch(addToken(state.contract));

            setState(state => ({
                ...state,
                contract: '',
                contractValid: false,
                hideInputAfterSave: true,
                warning: false
            }));
            
        } else {
            dispatch(tokenErrorHide());

            setState(state => ({
                ...state,
                contract: '',
                contractValid: false,
                warning: true
            }));
        }
    }

    useEffect(() => {
        if (state.hideInputAfterSave) {
            setState(state => ({
                ...state,
                inputVisible: false,
                hideInputAfterSave: false
            }));
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenList]);

    const refreshBalanceHandler = () => {
        if (tokenList.length !== 0) {
            dispatch(spinRefresh());

            setState(state => ({
                ...state,
                spin: !state.spin
            }));
        }
    }

    useEffect(() => {
        if (tokenList.length !== 0) {
            dispatch(refreshTokensBalance());
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.spin, network]);


    return (
        <div className={classes.main}>
            <div>
                <p className={classes.text}>Tokens Balance
                    <i
                        onClick={refreshBalanceHandler}
                        className={`
                            fa fa-refresh
                            ${refresh ? 'fa-spin' : ''}
                            ${classes.iconRefresh}
                        `}
                    ></i>
                </p>
                {tokenList.length !== 0 &&
                    <TokenList />
                }
                <Button
                    customClass={classes.addTokensBtn}
                    onClick={addTokensHandler}
                >Add Tokens</Button>
            </div>
            {state.inputVisible &&
                <div>
                    <p className={classes.text}>Token Contract Address</p>
                    <Input
                        customClass={classes.input}
                        onChange={inputContractHandler}
                        value={state.contract}
                    />
                    <Button
                        customClass={classes.saveBtn}
                        disabled={state.contractValid ? '' : 'disabled'}
                        onClick={saveButtonHandler}
                    >Save</Button>
                    {tokenError &&
                        <p className={classes.errorText}>
                            Error! Contract Address Not Found.
                        </p>
                    }
                    {state.warning &&
                        <p className={classes.errorText}>
                            Warning! Token Already Exist.
                        </p>
                    }
                </div>
            }
        </div>
    );
}

export default TokensArea;
