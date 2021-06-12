import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './GasSettings.module.scss';
import Button from '../../components/Button/Button';
import { gasSettings } from '../../redux/actions/gas';

const GasSettings = () => {
    const [state, setState] = useState({
        gasPrice: '',
        gasLimit: '',
        warning: false,
        warningText: '',
        success: false
    });

    const dispatch = useDispatch();

    const maxGasPrice = useSelector(reduxState => {
        return reduxState.gas.maxGasPrice;
    });

    const maxGasLimit = useSelector(reduxState => {
        return reduxState.gas.maxGasLimit;
    });

    useEffect(() => {
        setState(state => ({
            ...state,
            gasPrice: maxGasPrice,
            gasLimit: maxGasLimit
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const inputHandler = (e, id) => {
        const regex = /^\+?([1-9]\d*)+$|^$/;
        let value = e.target.value;
        const valid = regex.test(value);

        if (id === 1 && valid) {
            setState(state => ({...state, gasPrice: value}));
        }
        if (id === 2 && valid) {
            setState(state => ({...state, gasLimit: value}));
        }
    }

    const saveGasSettingsHandler = () => {
        const cond1 = state.gasPrice <= 2000;
        const cond2 = state.gasLimit >= 21000 && 
            state.gasLimit <= 2000000;
        
        if (cond1 && cond2) {
            const gas = {
                gasPrice: +state.gasPrice,
                gasLimit: +state.gasLimit
            }

            dispatch(gasSettings(gas));

            setState(state => ({
                ...state,
                warning: true,
                warningText: 'Success!',
                success: true
            }));
        } else if (cond1 && (cond1 || cond2)) {
            setState(state => ({
                ...state,
                warning: true,
                success: false,
                warningText: 'Gas Limit less than 21000 or more than 2000000'
            }));
        } else if (cond2 && (cond1 || cond2)) {
            setState(state => ({
                ...state,
                warning: true,
                success: false,
                warningText: 'Gas Price more than 2000'
            }))
        } else {
            setState(state => ({
                ...state,
                warning: true,
                success: false,
                warningText: 'Gas Price and Gas Limit too high'
            }))
        }
    }

    return (
        <div className={classes.content}>
            <div className={classes.discription}>
                <p>With these settings you can expand custom gas limits.</p>
                <p>If the default settings are enough for you, do not change this limits.</p>
            </div>
            <div className={classes.item}>
                <p className={classes.title}>Maximum Gas Price (Gwei)</p>
                <input
                    className={classes.inputText}
                    type="text"
                    onChange={e => inputHandler(e, 1)}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={state.gasPrice}
                />
                <p className={classes.textPrompt}>no more than 2000</p>
            </div>
            <div className={classes.item}>
                <p className={classes.title}>Maximum Gas Limit</p>
                <input
                    className={classes.inputText}
                    type="text"
                    onChange={e => inputHandler(e, 2)}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    value={state.gasLimit}
                />
                <p className={classes.textPrompt}>no more than 2000000</p>
            </div>
            {state.warning &&
                <p className={`
                    ${state.success ? classes.success : classes.warning}
                `}>
                    {state.warningText}
                </p>
            }
            <Button
                customClass={classes.button}
                onClick={saveGasSettingsHandler}
                disabled={state.gasPrice !== '' && state.gasLimit !== ''
                    ? '' : 'disabled'}
            >Save</Button>
        </div>
    );
}

export default GasSettings;
