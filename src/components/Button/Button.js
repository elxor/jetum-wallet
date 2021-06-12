import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {

    const {customClass, disabled, children, onClick} = props;

    return (
        <button
            onClick={onClick}
            className={`${classes.button} ${customClass || ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
