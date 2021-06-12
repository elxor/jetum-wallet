import React from 'react';
import classes from './Preloader.module.scss';

const Preloader = () => {
    return (
        <div className={classes.preloaderWrapper}>
            <div className={classes.preloader}></div>
        </div>
    );
}

export default Preloader;
