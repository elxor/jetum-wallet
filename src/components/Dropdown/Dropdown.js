import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Dropdown.module.scss';

const Dropdown = (props) => {

    useEffect(() => {
        document.body.addEventListener('click', props.onClick);

        return () => {
            document.body.removeEventListener('click', props.onClick);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.dropdown} onClick={e => e.stopPropagation()}>
            <p
                className={classes.item}
                onClick={props.showPrivateKey}
            >Show Private Key</p>
            <p
                className={classes.item}
                onClick={props.gasSettings}
            >Gas Settings</p>
            <Link exact="true" to="/" className={classes.item}>Logout</Link>
        </div>
    );
}

export default Dropdown;
