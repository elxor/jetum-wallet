import React from 'react';
import { useSelector } from 'react-redux';
import classes from './SelectTokens.module.scss';

const SelectTokens = (props) => {
    const tokens = useSelector(reduxState => {
        return reduxState.tokens.tokenList;
    });
    
    return (
        <div className={classes.selectWrapper}>
            <select
                ref={props.selectRef}
                className={classes.selectCustom}
                onChange={props.onChange}
                value={props.value}
            >
                <option value={"ETH"}>ETH</option>
                {tokens.map((item, i) => (
                    item.balance === 'error'
                    ? ''
                    : <option
                        value={i}
                        key={i}
                    >{item.symbol}</option>
                ))}
            </select>
            <span className={classes.angleDown}>
                <i className='fa fa-caret-down' aria-hidden="true"></i>
            </span>
        </div>
    );
}

export default SelectTokens;
