import React, { useState } from 'react';
import classes from './Tabs.module.scss';

const Tabs = ({props}) => {

    const [state, setState] = useState(0);

    const tabClick = e => setState(+e.target.dataset.index);

    return (
        <div className={classes.tabs}>
            <div className={classes.tabsHeader} >
                {props.map((item, i) => (
                    <div
                        className={`
                            ${classes.tabsTitle}
                            ${i === state ? `${classes.tabsActive}` : ''}
                        `}
                        onClick={tabClick}
                        data-index={i}
                        key={i}
                    >{item.title}</div>
                ))}
            </div>

            <div className={classes.tabsBody}>
                {props[state].content}
            </div>
        </div>
    );
}

export default Tabs;
