import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import classes from './TxFee.module.scss';
import InputRange from '../../components/InputRange/InputRange';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import Tooltip from '../../components/Tooltip/Tooltip';

const TxFee = (props) => {

    const [state, setState] = useState({
        checked: false
    });

    const switchHadnler = () => {
        setState(state => ({
            ...state,
            checked: !state.checked
        }));
    }

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    const nonce = useSelector(reduxState => {
        return reduxState.data.nonce;
    });

    const maxGasPrice = useSelector(reduxState => {
        return reduxState.gas.maxGasPrice;
    });

    const maxGasLimit = useSelector(reduxState => {
        return reduxState.gas.maxGasLimit;
    });

    return (
        <Fragment>
            <div>
                <p className={classes.text}>Gas price (Gwei)</p>
                <InputRange
                    onChange={e => props.onChange(e, 1)}
                    settings={{min: '1', max: maxGasPrice, step: '1'}}
                    value={props.gasPrice}
                />
            </div>
            <div>
                <p className={classes.text}>Transaction Fee</p>
                <p className={classes.txFeeLine}>
                    {props.txFee}
                    {network === 'mainnet'
                        ? <span className={classes.feeMargin}> = {props.txFeeUsd}
                            <span className={classes.usdSymbol}>$</span>
                        </span>
                        : ''
                    }
                </p>
            </div>
            <div className={classes.advansedSettings}>
                <p className={classes.advansedTitle}>Advanced Settings</p>
                <div className={classes.switcherWrapper}>
                    <span>Gas limit/Data/Nonce</span>
                    <SimpleSwitch
                        id="advansedSettings"
                        onChange={switchHadnler}
                        checked={state.checked}
                    />
                </div>
            </div>
            {state.checked &&
                <div className={classes.hiddenSettings}>
                    <div>
                        <p className={classes.text}>Gas limit</p>
                        <InputRange
                            onChange={e => props.onChange(e, 2)}
                            settings={{min: '21000', max: maxGasLimit, step: '1000'}}
                            value={props.gasLimit}
                        />
                    </div>
                    {props.typeCoin === 'ETH' &&
                        <div className={classes.inputDataWrapper}>
                            <span className={classes.spanFontSize}>Add&nbsp;Data</span>
                            <input
                                className={classes.inputData}
                                type="text"
                                placeholder="Add Data (e.g. 0x6578616d706c65)"
                                onChange={props.setData}
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                                value={props.inputData}
                            />
                        </div>
                    }
                    <div>
                        <span className={classes.spanFontSize}>Nonce</span>
                        <Tooltip
                            hoverText="Nonce is the number of transactions sent from a given address. DO NOT CHANGE this settings if you don't know what is it."
                        />
                        <input
                            className={classes.inputNonce}
                            type="text"
                            onChange={props.setNonce}
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            placeholder={nonce}
                            value={props.nonceValue}
                        />
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default TxFee;
