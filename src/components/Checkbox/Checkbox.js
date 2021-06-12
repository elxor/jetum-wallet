import React from 'react';
import classes from './Checkbox.module.scss';

const Checkbox = (props) => {

    return (
        <div className={classes.checkboxWrapper}>
            <input
                onChange={props.onChange}
                className={classes.checkbox}
                checked={props.checked ? 'checked' : ''}
                type="radio"
                id={'account'+ props.inputId}
            />
            <i className="fa fa-check" aria-hidden="true"></i>
        </div>
    );
}

export default Checkbox;