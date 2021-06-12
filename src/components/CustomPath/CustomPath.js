import React from 'react';
import classes from './CustomPath.module.scss';

const CustomPath = (props) => {

    return (
        <div className={classes.customPath}>
            <p>Custom Path</p>
            <div>
                <span
                    className={classes.add}
                    onClick={props.addClickHandler}
                >add</span>
                <input
                    type="text"
                    onChange={props.onChange}
                    value={props.value}
                    className={classes.input}
                />
            </div>
        </div>
    );
}

export default CustomPath;
