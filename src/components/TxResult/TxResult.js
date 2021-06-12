import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './TxResult.module.scss';
import Modal from '../Modal/Modal';
import { clearTxData } from '../../redux/actions/transaction';

const TxResult = () => {
    const [state, setState] = useState({
        modal: false
    });

    const dispatch = useDispatch();

    const txHash = useSelector(reduxState => {
        return reduxState.transaction.txHash;
    });

    const error = useSelector(reduxState => {
        return reduxState.transaction.error;
    });

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    useEffect(() => {
        if (txHash !== '' || error) {
            setState(state => ({
                ...state,
                modal: true
            }));
        }
    }, [txHash, error]);

    const modalToogleHandler = () => {
        setState(state => ({
            ...state,
            modal: !state.modal
        }));
        dispatch(clearTxData());
    }

    return (
        <Fragment>
            {state.modal && <Modal onClick={modalToogleHandler}>
                {txHash !== '' &&
                    <div className={classes.success}>
                        <p className={classes.headerSuccess}>Success!</p>
                        <div>
                            <p className={classes.title}>Transaction Hash</p>
                            <p className="wordwrap">{txHash}</p>
                        </div>
                        <a
                            className={classes.link}
                            href={network === 'mainnet'
                                ?  `https://etherscan.io/tx/${txHash}`
                                : `https://${network}.etherscan.io/tx/${txHash}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >view on etherscan</a>
                    </div>
                }
                {error &&
                    <div className={classes.error}>
                        <p className={classes.headerError}>Error!</p>
                        <p>{error}</p>
                    </div>
                }
            </Modal>}
        </Fragment>
    );
}

export default TxResult;
