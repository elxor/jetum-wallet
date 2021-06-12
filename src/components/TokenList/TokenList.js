import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './TokenList.module.scss';
import { removeToken } from '../../redux/actions/tokens';

const TokenList = () => {
    const dispatch = useDispatch();

    const tokenList = useSelector(reduxState => {
        return reduxState.tokens.tokenList;
    });

    const removeTokenHandler = e => {
        dispatch(removeToken(+e.target.dataset.id));
    }

    return (
        <div className={classes.tokenList}>
            {tokenList.map((item, i) => (
                <div className={classes.tokenItem} key={i}>
                    <i 
                        onClick={removeTokenHandler}
                        data-id={i}
                        className={`fa fa-close ${classes.iconClose}`}
                    ></i>
                    <p>
                        {item.symbol}
                        <span className={classes.balance}>{item.balance}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default TokenList;
