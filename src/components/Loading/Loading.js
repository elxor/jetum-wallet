import React from 'react';
import classes from './Loading.module.scss';

const Loading = (props) => {
    return (
        <div className={`${classes.loading} ${props.customClass}`}>
            <i className={`fa fa-spinner fa-spin ${classes.iconSpin}`}></i>
        </div>
    );
}

export default Loading;
