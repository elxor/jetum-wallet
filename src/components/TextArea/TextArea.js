import React from 'react';
import classes from './TextArea.module.scss';

const TextArea = (props) => {
    return (
        <textarea
            className={classes.textarea}
            onChange={props.onChange}
            value={props.value}
            placeholder="Enter signed raw transaction or upload JSON file"
        />
    );
}

export default TextArea;
