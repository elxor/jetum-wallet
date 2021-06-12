import React, { useState } from 'react';
import classes from './InputPassword.module.scss';

const InputPassword = (props) => {

    const [visible, setVisible] = useState(false);

    const clickHandler = () => {
        setVisible(!visible);
    }

    return (
        <div className={`${classes.wrapper} ${props.customClass || ''}`}>
            <input
                className={classes.input}
                onChange={props.onChange}
                type={visible ? 'text' : 'password'}
                placeholder={props.placeholder}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={props.value}
            />
            <i
                className={`fa ${visible ? 'fa-eye-slash' :'fa-eye'} ${classes.iconEye}`}
                onClick={clickHandler}
            ></i>
        </div>
    );
}

export default InputPassword;
