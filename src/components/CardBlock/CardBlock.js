import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CardBlock.module.scss';

const CardBlock = (props) => {

    const {to, customClass, content:{icon, title, text, start}} = props;

    return (
        <Link to={to} className={`${classes.block} ${customClass || ''}`}>
            <div className={classes.img}>
                <i className={`icon ${icon} ${classes.iconSize}`} aria-hidden="true"></i>
            </div>
            <h3 className={classes.titleStyle}>{title}</h3>
            <p className={classes.textStyle}>{text}</p>
            <p className={classes.arrow}>{start}
				<i className={`fa fa-long-arrow-right ${classes.iconPosition}`} aria-hidden="true"></i>
			</p>
        </Link>
    );
}

export default CardBlock;