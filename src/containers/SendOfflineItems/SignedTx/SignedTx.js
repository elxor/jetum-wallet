import React from 'react';
import classes from './SignedTx.module.scss';
import Button from '../../../components/Button/Button';
import TextArea from '../../../components/TextArea/TextArea';

const SignedTx = (props) => {
    return (
        <div>
            <div className={classes.title}>
                <p>3. Signed Raw Transaction</p>
            </div>
            <div className={classes.content}>
                <div className={classes.subtitle}>
                    <p className={classes.text}>Raw Transaction</p>
                    <div className={classes.uploadWrapper}>
                        <label htmlFor="uploadId" className={classes.uploadLabel}>
                            Upload JSON File
                        </label>
                        <input
                            id="uploadId"
                            type="file"
                            onChange={props.onChangeUploadFile}
                            className={classes.inputFile}
                            onClick={e => e.target.value = null}
                        /> 
                    </div>
                </div>
                <TextArea
                    onChange={props.onChangeTextArea}
                    value={props.valueTextArea}
                />
                {!props.txDataValid && props.warning !== ''
                     && <div className={classes.warning}>
                            {props.warning}
                        </div>
                }
                <div className={classes.viewBtnWrapper}>
                    <Button
                        customClass={classes.viewBtn}
                        onClick={props.onClickViewTxDetails}
                    >
                        View Tx Details
                    </Button>
                    
                </div>
            </div>
        </div>
    );
}

export default SignedTx;
