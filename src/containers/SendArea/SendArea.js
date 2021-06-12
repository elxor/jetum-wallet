import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Decimal } from 'decimal.js';
import Web3 from 'web3';
import classes from './SendArea.module.scss';
import Input from '../../components/Input/Input';
import SelectTokens from '../../components/SelectTokens/SelectTokens';
import Button from '../../components/Button/Button';
import TxFee from '../TxFee/TxFee';
import { sendEther, txLoading, sendToken } from '../../redux/actions/transaction';
import Loading from '../../components/Loading/Loading';
import TxResult from '../../components/TxResult/TxResult';


const SendArea = () => {

    const [state, setState] = useState({
        gasPrice: 1,
        gasLimit: 21000,
        txFee: 0,
        txFeeUsd: 0,
        nonce: '',
        address: '',
        amount: '',
        maxEthAmount: '',
        maxTokenAmount: '',
        addressValid: false,
        amountValid: false,
        amountWarning: '',
        data: '',
        dataValid: true,
        typeCoin: 'ETH'
    });

    const selectEl = useRef('');

    const dispatch = useDispatch();

    const gasPriceRedux = useSelector(reduxState => {
        return reduxState.data.gasPrice
    });

    const ethUsdPrice = useSelector(reduxState => {
        return reduxState.data.usdPrice;
    });

    const ethBalance = useSelector(reduxState => {
        return reduxState.data.ethBalance;
    });

    const maxGasPrice = useSelector(reduxState => {
        return reduxState.gas.maxGasPrice;
    });

    const maxGasLimit = useSelector(reduxState => {
        return reduxState.gas.maxGasLimit;
    });

    const tokens = useSelector(reduxState => {
        return reduxState.tokens.tokenList;
    });

    const txLoadingBtn = useSelector(reduxState => {
        return reduxState.transaction.loading;
    });

    const inputsClear = useSelector(reduxState => {
        return reduxState.transaction.inputsClear;
    });


    const chageGasLimit = () => {
        if (selectEl.current.value === 'ETH') {
            setState(state => ({
                ...state,
                gasLimit: 21000
            }));
        } else {
            setState(state => ({
                ...state,
                gasLimit: 80000
            }));
        }
    }

    const changeMaxTokenAmount = () => {
        const value = selectEl.current.value === 'ETH'
            ? 'ETH' : tokens[selectEl.current.value];

        if (value !== 'ETH') {
            setState(state => ({
                ...state,
                maxTokenAmount: value.balance
            }));
        }
    }

    useEffect(() => {
        chageGasLimit();
        changeMaxTokenAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokens]);


    useEffect(() => {
        setState(state => ({
            ...state,
            typeCoin: selectEl.current.value
        }));
    }, [selectEl.current.value]);


    useEffect(() => {
        // Data Input Validation
        const validSubStr = state.data.startsWith('0x');
        const hexValid = Web3.utils.isHexStrict(state.data);
        const isDataValid = hexValid || state.data === '';

        setState(state => ({
            ...state,
            dataValid: isDataValid
        }));

        if (validSubStr && hexValid) {
            const value = 21000 + (state.data.length - 2) * 70;
            setState(state => ({
                ...state,
                gasLimit: value
            }));
        } else if (state.data === '') {
            setState(state => ({
                ...state,
                gasLimit: 21000
            }));
        }
    }, [state.data]);


    useEffect(() => {
        setState(state => ({
            ...state,
            gasPrice: gasPriceRedux
        }));
    }, [gasPriceRedux]);


    useEffect(() => {
        const fee = Decimal
            .mul(+state.gasPrice, +state.gasLimit)
            .div(1000000000).toNumber();

        const feeUsd = Decimal
            .mul(fee, +ethUsdPrice)
            .toNumber();

        const amountEthMinusFee = new Decimal(ethBalance)
            .minus(fee).toNumber();

        setState(state => ({
            ...state,
            txFee: fee,
            txFeeUsd: feeUsd.toFixed(4).slice(0, -1),
            maxEthAmount: amountEthMinusFee
        }));

    }, [state.gasPrice, state.gasLimit, ethUsdPrice, ethBalance]);


    useEffect(() => {
        if (selectEl.current.value === 'ETH') {
            const amountEthValid = state.amount <= state.maxEthAmount
                && state.amount !== ''
                && state.txFee !== 0;

            setState(state => ({
                ...state,
                amountValid: amountEthValid
            }));

        } else {
            const amountTokenValid = state.amount <= state.maxTokenAmount
                && state.amount !== ''
                && ethBalance >= state.txFee
                && state.txFee !== 0;

            setState(state => ({
                ...state,
                amountValid: amountTokenValid
            }));
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.amount, state.maxEthAmount, state.maxTokenAmount]);


    useEffect(() => {
        // Address Input Validation
        const isAddressValid = Web3.utils.isAddress(state.address);
        
        setState(state => ({
            ...state,
            addressValid: isAddressValid
        }));
    }, [state.address]);


    const addressInputHandler = e => {
        setState(state => ({
            ...state,
            address: e.target.value
        }));
    }

    const amountInputHandler = e => {
        const regex = /^[0-9]*[.,]?[0-9]*$/;
        const value = e.target.value;

        const inputValid = regex.test(value);

        if (inputValid) {
            setState(state => ({
                ...state,
                amount: value,
                amountWarning: ''
            }));
        }
    }

    const maxAmountBtnHandler = () => {
        if (selectEl.current.value === 'ETH') {
            state.maxEthAmount >= state.txFee
                ? setState(state => ({
                    ...state,
                    amount: state.maxEthAmount,
                    amountWarning: ''
                }))
                : setState(state => ({
                    ...state,
                    amountWarning: 'not enough balance',
                }));
            
        } else {
            ethBalance >= state.txFee
                ? setState(state => ({
                    ...state,
                    amount: state.maxTokenAmount,
                    amountWarning: ''
                }))
                : setState(state => ({
                    ...state,
                    amountWarning: 'not enough eth balance for tx fee'
                }));
        }
    }

    const gasInputsHandler = (e, id) => {
        const regex = /^[0-9]*[.,]?[0-9]*$/;
        const value = e.target.value;
        const valid = regex.test(value);

        if (id === 1
                && valid
                && value <= maxGasPrice
            ) {
            setState(state => ({
                ...state,
                gasPrice: value
            }));
        }
        if (id === 2
                && valid
                && value >= 21000
                && value <= maxGasLimit
            ) {
            setState(state => ({
                ...state,
                gasLimit: value
            }));
        }
    }

    const nonceInputHandler = e => {
        const regex = /^\+?([0-9]\d*)+$|^$/;
        const valid = regex.test(e.target.value);

        if (valid) {
            setState(state => ({
                ...state,
                nonce: e.target.value
            }));
        }
    }

    const dataInputHandler = e => {
        setState(state => ({
            ...state,
            data: e.target.value
        }));
    }

    const selectTokensHandler = () => {
        changeMaxTokenAmount();
        chageGasLimit();
    }

    const sendButtonHandler = () => {
        dispatch(txLoading());

        if (selectEl.current.value === 'ETH') {
            dispatch(sendEther(state.address,
                state.amount,
                state.gasPrice,
                state.gasLimit,
                state.data,
                state.nonce
            ));
        } else {
            dispatch(sendToken(state.address,
                state.amount,
                state.gasPrice,
                state.gasLimit,
                state.nonce,
                selectEl.current.value
            ));
        } 
    }

    useEffect(() => {
        if (inputsClear) {
            setState(state => ({
                ...state,
                address: '',
                amount: '',
                data: '',
                nonce: ''
            }));
        }
    }, [inputsClear]);


    return (
        <div className={classes.main}>
            <div>
                <p className={classes.header}>Send Transaction</p>
                <p className={classes.text}>To address</p>
                <div className={classes.row}>
                    <Input
                        customClass={classes.input}
                        onChange={addressInputHandler}
                        value={state.address}
                    />
                </div>
            </div>
            <div>
                <p className={classes.text}>Amount</p>
                <div className={classes.row}>
                    <Input
                        customClass={classes.input}
                        onChange={amountInputHandler}
                        value={state.amount}
                    />
                    <SelectTokens
                        onChange={selectTokensHandler}
                        selectRef={selectEl}
                    />
                </div>
                <p
                    className={classes.maxAmount}
                    onClick={maxAmountBtnHandler}
                >Max amount</p>
                <span className={classes.warningAmount}>{state.amountWarning}</span>
            </div>
            <TxFee
                onChange={gasInputsHandler}
                setNonce={nonceInputHandler}
                setData={dataInputHandler}
                nonceValue={state.nonce}
                gasPrice={state.gasPrice}
                gasLimit={state.gasLimit}
                txFee={state.txFee}
                txFeeUsd={state.txFeeUsd}
                inputData={state.data}
                typeCoin={state.typeCoin}
            />
            <div className={classes.buttonWrapper}>
                {txLoadingBtn
                    ? <Loading
                        customClass={classes.loading}
                    />
                    : <Button
                        customClass={classes.button}
                        onClick={sendButtonHandler}
                        disabled={state.addressValid
                            && state.amountValid
                            && state.dataValid
                            ? '' : 'disabled'}
                    >Send</Button>
                }
            </div>
            <TxResult />
        </div>
    );
}

export default SendArea;
