import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Decimal } from 'decimal.js';
import classes from './AccountInfo.module.scss';
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard';
import { getEthBalance, spinRefresh } from '../../redux/actions/data';
import { getSymbolByNetwork } from '../../utils/getSymbolByNetwork';

const AccountInfo = () => {

    const [state, setState] = useState({
        ethUsdBalance: 0,
        spin: false
    });

    const dispatch = useDispatch();

    const address = useSelector(reduxState => {
        return reduxState.account.address
    });

    const balance = useSelector(reduxState => {
        return reduxState.data.ethBalance;
    });

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    const ethUsdPrice = useSelector(reduxState => {
        return reduxState.data.usdPrice;
    });

    const refresh = useSelector(reduxState => {
        return reduxState.data.spinRefresh;
    });

    const refreshBalanceHandler = () => {
        dispatch(spinRefresh());
        
        setState(state => ({
            ...state,
            spin: !state.spin
        }));
    }

    useEffect(() => {
        dispatch(getEthBalance(network));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [network, state.spin]);


    useEffect(() => {
        const result = Decimal
            .mul(+balance, +ethUsdPrice)
            .toNumber();

        setState(state => ({
            ...state,
            ethUsdBalance: result.toFixed(3).slice(0, -1)
        }));
    }, [balance, ethUsdPrice]);

    return (
        <div className={classes.main}>
            <div>
                <p className={classes.text}>Account Address</p>
                <span className="wordwrap">{address}</span>
                <CopyToClipboard
                    textToCopy={address}
                    customClass={classes.copy}    
                />
            </div>
            <div>
                <p className={classes.text}>Account Balance
                    <i
                        className={`
                            fa fa-refresh
                            ${refresh ? 'fa-spin' : ''}
                            ${classes.iconRefresh}
                        `}
                        onClick={refreshBalanceHandler}
                    ></i>
                </p>
                <p className={classes.ethBalance}>
                    {balance} {getSymbolByNetwork(network)}
                </p>
                <p>
                    {network === 'mainnet'
                        ? state.ethUsdBalance
                        : 0
                    }
                    <span className={classes.usdSymbol}>$</span>
                </p>
            </div>
            <div>
                <p className={classes.text}>Transaction History</p>
                <a
                    className={classes.link}
                    href={network === 'mainnet'
                        ?  `https://etherscan.io/address/${address}`
                        : `https://${network}.etherscan.io/address/${address}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                >etherscan.io</a>
            </div>
        </div>
    );
}

export default AccountInfo;
