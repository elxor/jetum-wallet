import React from 'react';
import classes from './SimpleSwitch.module.scss';

const SimpleSwitch = (props) => {
    return (
        <div className={classes.switcher}>
            <input type="checkbox"
                className={classes.checkbox}
                id={props.id}
                onChange={props.onChange}
                checked={props.checked ? 'checked' : ''}
            />
            <label className={classes.label} htmlFor={props.id} />
        </div>
    );
}

export default SimpleSwitch;
