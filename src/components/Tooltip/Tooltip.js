import React from 'react';
import classes from './Tooltip.module.scss';

const Tooltip = ({hoverText}) => {
    return (
        <div className={`${classes.exclamation}`} tooltip={hoverText}>
            <i className={`fa fa-exclamation-circle ${classes.iconExclamation}`} aria-hidden="true"></i>
        </div>
    );
}

export default Tooltip;
