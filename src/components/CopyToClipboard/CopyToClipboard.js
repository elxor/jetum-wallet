import React, { useState } from 'react';
import classes from './CopyToClipboard.module.scss';


const CopyToClipboard = ({textToCopy, customClass, hoverHint}) => {

    const [state, setState] = useState({
        hoverText: 'Copy to clipboard',
        check: false
    });

    const clickHandler = () => {
        navigator.clipboard.writeText(textToCopy);

        setState(state => ({
            ...state,
            hoverText: 'Copied',
            check: true
        }));

        setTimeout(() => {
            setState(state => ({
                ...state,
                hoverText: 'Copy to clipboard',
                check: false
            }));
        }, 1500);
    }

    return (
        <div
            onClick={clickHandler}
            className={`
                ${hoverHint ? classes.hover : classes.copy} ${customClass || ''}
            `}
            tooltip={state.hoverText}
        >
            <i className={`
                ${state.check ? 'fa fa-check': 'fa fa-copy'}
                ${classes.iconClass}`}
            ></i>
        </div>
    );
}

export default CopyToClipboard;
