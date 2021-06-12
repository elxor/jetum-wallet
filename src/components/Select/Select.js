import React from 'react';
import classes from './Select.module.scss';

const Select = (props) => {

    return (
        <div className={classes.selectWrapper}>
            <select
                className={`${classes.selectCustom} ${props.customClass}`}
                onChange={props.onChange}
                value={props.value}
            >
                {props.options.map((item, i) => (
                    <option value={item} key={i}>{item}</option>
                ))}
            </select>
            <span className={classes.angleDown}>
                <i className='fa fa-angle-down' aria-hidden="true"></i>
            </span>
        </div>
    );
}

export default Select;