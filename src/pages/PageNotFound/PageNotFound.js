import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <div className={classes.unknown}>
            <p className={classes.code}>404</p>
            <p className={classes.text}>Page Not Found</p>
            <Link exact="true" to="/" className={classes.home}>
                Back Home
            </Link>
        </div>
    );
}

export default PageNotFound;
