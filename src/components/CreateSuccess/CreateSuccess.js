import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CreateSuccess.module.scss';
import Button from '../Button/Button';


const CreateSuccess = () => {
    return (
        <div className={classes.body}>
            <div>
                <i className={`fa fa-check ${classes.iconCheck}`}></i>
            </div>
            <h2 className={classes.title}>Success</h2>
            <Link to="/access-wallet">
                <Button customClass={classes.button}>Access My Wallet</Button>
            </Link>
        </div>
    );
}

export default CreateSuccess;
