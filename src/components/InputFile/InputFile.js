import React from 'react';
import classes from './InputFile.module.scss';

const InputFile = (props) => {
    
    return (
        <div className={classes.inputFileWrapper}>
            <label htmlFor="inputId" className={classes.label}>Select Wallet File...</label>
            <input
                id="inputId"
                type="file"
                onChange={props.onChange}
                className={classes.inputFile}
                onClick={e => e.target.value = null}
            />    
            <p className={classes.fileName}>
                {props.name}
            </p>
        </div>
    );
}

export default InputFile;
