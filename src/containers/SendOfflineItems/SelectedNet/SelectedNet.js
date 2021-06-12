import React from 'react';
import classes from './SelectedNet.module.scss';

const SelectedNet = ({ network }) => {
    return (
        <div className={classes.title}>
            <p>1. Selected Network</p>
            <p>{network[0].toUpperCase() + network.slice(1)}</p>
        </div>
    );
}

export default SelectedNet;
