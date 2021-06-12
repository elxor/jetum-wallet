import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ShowPrivateKey.module.scss';
import CopyToClipboard from '../CopyToClipboard/CopyToClipboard';
import Button from '../Button/Button';

const ShowPrivateKey = () => {
    const [state, setState] = useState({
        show: false
    });

    const privateKey = useSelector(reduxState => {
        return reduxState.account.privateKey;
    });

    const showHandler = () => {
        setState(state => ({...state, show: !state.show}));
    }

    return (
        <div className={classes.content}>
            <p className={classes.warning}>
                This is unsafe. Please make sure no one is watching you.
            </p>

            <Button
                onClick={showHandler}
                customClass={classes.button}
            >Show</Button>

            {state.show &&
                <div className={classes.privateKeyWrapper}>
                <span className="wordwrap">{privateKey}</span>
                <CopyToClipboard 
                    textToCopy={privateKey}
                    customClass={classes.copy}
                />
            </div>
            }
        </div>
    );
}

export default ShowPrivateKey;
