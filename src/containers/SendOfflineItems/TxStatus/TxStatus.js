import React from 'react';
import { useSelector } from 'react-redux';
import classes from './TxStatus.module.scss';

const TxStatus = (props) => {

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    return (
        <div>
            <div className={classes.title}>
                <p>5. Transaction Status</p>
            </div>
            {props.txStatus &&
                <div className={classes.content}>
                    {props.txHash !== '' && 
                        <div className={classes.success}>
                            <p className={classes.headerSuccess}>Success!</p>
                            <p className={classes.text}>
                                Transaction Hash
                            </p>
                            <p className="wordwrap">
                                {props.txHash}
                            </p>
                            <a
                                className={classes.link}
                                href={network === 'mainnet'
                                    ?  `https://etherscan.io/tx/${props.txHash}`
                                    : `https://${network}.etherscan.io/tx/${props.txHash}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >view on etherscan</a>
                        </div>
                    }
                    {props.txError &&
                        <div className={classes.error}>
                            <p className={classes.headerError}>Error!</p>
                            <p>{props.txErrorMessage}</p>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default TxStatus;
