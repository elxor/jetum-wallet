import React from 'react';
import classes from './InputRange.module.scss';

const InputRange = ({settings, onChange, value}) => {

    return (
        <div className={classes.wrapper}>
            <input
                className={classes.inputRange}
                type="range"
                min={settings.min}
                max={settings.max}
                step={settings.step}
                onChange={onChange}
                value={value}
            />
            <input
                className={classes.inputText}
                type="text"
                onChange={onChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={value}
            />
        </div>
    );
}

export default InputRange;
