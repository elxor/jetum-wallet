import React from 'react';
import classes from './TxDetails.module.scss';
import Button from '../../../components/Button/Button';
import { getNetworkById } from '../../../utils/getNetworkById';

const TxDetails = ({txData, selectedChainId, onClickSendTransaction, sendLoading}) => {

    return (
        <div>
            <div className={classes.title}>
                <p>4. Transaction Details</p>
            </div>

            {txData.isTxData &&
                <div className={classes.info}>
                    <div className={classes.itemInfo}>
                        <p className={`${classes.text} ${classes.marginRight}`}>
                            Sender:
                        </p>
                        <p className="wordwrap">
                            {txData.sender}
                        </p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={`${classes.text} ${classes.marginRight}`}>
                            Receiver:
                        </p>
                        <p className="wordwrap">
                            {txData.receiver}
                        </p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={classes.text}>Nonce:</p>
                        <p>{txData.nonce}</p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={classes.text}>Value:</p>
                        <p>
                            {txData.value} {getNetworkById(txData.chainId).symbol}
                        </p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={`${classes.text} ${classes.marginRight}`}>
                            Data:
                        </p>
                        <p className="wordwrap">{txData.data}</p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={classes.text}>Chain ID:</p>
                        <p>
                            {txData.chainId} ({getNetworkById(txData.chainId).network})
                        </p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={classes.text}>Gas Limit:</p>
                        <p>{txData.gasLimit}</p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={classes.text}>Gas Price (in Gwei):</p>
                        <p>{txData.gasPrice} Gwei</p>
                    </div>
                    <div className={classes.itemInfo}>
                        <p className={classes.text}>Fee:</p>
                        <p>{txData.fee} {getNetworkById(txData.chainId).symbol}</p>
                    </div>

                    <div className={classes.sendBtnWrapper}>
                        {sendLoading
                            ? <div className={classes.loading}>
                                <i className={`fa fa-spinner fa-spin ${classes.iconSpin}`}></i>
                            </div>
                            : <Button
                                    customClass={classes.sendBtn}
                                    onClick={onClickSendTransaction}
                                    disabled={selectedChainId === txData.chainId
                                        ? '' : 'disabled'
                                    }
                                >
                                Send
                            </Button>
                        }
                        {selectedChainId !== txData.chainId
                            && <div className={classes.warning}>
                                    Warning: Signed Chain ID does not match chain id for selected network!
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default TxDetails;
