import React from 'react';
import classes from './SwitchButton.module.scss';

const SwitchButton = (props) => {

    return (
        <div className={classes.switcher}>
            <input 
                className={classes.checkbox}
                onChange={props.onChange}
                type="checkbox"
                id="checkboxId"
                checked={props.checked ? 'checked' : ''} />
            <label className={classes.label} htmlFor="checkboxId" />
        </div>
    );
}

export default SwitchButton;
