import React from 'react';
import classes from './SelectAccount.module.scss';
import Checkbox from '../../components/Checkbox/Checkbox';
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard';

const SelectAccount = (props) => {

    return (
        <div className={classes.accounts}>
            <p className={classes.title}>Select Address to Interact With</p>

            <div className={classes.header}>
                <span></span>
                <span className={classes.center}>ID</span>
                <span>Address</span>
                <span></span>
			</div>

            <div className={classes.body}>
                {Object.entries(props.accounts).map((curr, i) => (
                    <label htmlFor={'account' + i}
                        className={`
                            ${classes.item}
                            ${props.checked === i ? classes.itemSelected : ''}
                        `}
                        key={i}>
                        <Checkbox
                            onChange={() => props.onChange(i, +curr[0])}
                            checked={props.checked === i ? true : false}
                            inputId={i}
                        />
                        <div className={classes.center}>{+curr[0] + 1}</div>
                        <div className={classes.address}>
                            <span>
                                {`${curr[1].address.slice(0, 16)}...${curr[1].address.slice(-8)}`}
                            </span>
                        </div>
                        <div className={classes.copyWrapper}>
                            <CopyToClipboard
                                textToCopy={curr[1].address}
                                customClass={classes.copy}
                            />
                        </div>
                    </label>
                ))}
            </div>
            
        </div>
    );
}

export default SelectAccount;
