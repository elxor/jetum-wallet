import React from 'react';
import { useSelector } from 'react-redux';
import classes from './GenerateInfo.module.scss';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const GenerateInfo = (props) => {

    const gasPrice = useSelector(reduxState => {
        return reduxState.data.gasPrice;
    });


    return (
        <div>
            <div className={classes.title}>
                <p>2. Generate Information</p>
            </div>
            <div className={classes.content}>
                <p className={classes.text}>From Address</p>
                <Input
                    customClass={classes.input}
                    placeholder="Please enter the address"
                    onChange={props.onChangeAddressInput}
                    value={props.addressValue}
                />
                {props.data.nonce !== '' &&
                    <div className={classes.info}>
                        <div className={classes.itemInfo}>
                            <p className={`${classes.text} ${classes.marginRight}`}>
                                Sender:
                            </p>
                            <p className="wordwrap">
                                {props.data.address}
                            </p>
                        </div>
                        <div className={classes.itemInfo}>
                            <p className={classes.text}>Nonce:</p>
                            <p>{props.data.nonce}</p>
                        </div>
                        <div className={classes.itemInfo}>
                            <p className={classes.text}>Chain ID:</p>
                            <p>{props.data.chainId} ({props.data.network})</p>
                        </div>
                        <div className={classes.itemInfo}>
                            <p className={classes.text}>Current Gas Price:</p>
                            <p>{gasPrice} Gwei</p>
                        </div>

                        <div className={classes.exportBtnWrapper}>
                            <Button
                                customClass={classes.exportBtn}
                                onClick={props.onClickExportFileBtn}
                                disabled={props.data.addressValid
                                    ? '' : 'disabled'
                                }
                            >
                                Export JSON File
                            </Button>
                        </div>
                    </div>
                }

                
                
            </div>
        </div>
        
    );
}

export default GenerateInfo;
