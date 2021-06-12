import React, { useState, useEffect }  from 'react';
import classes from './SeedList.module.scss';

const SeedList = ({array, onChange, inputs, onFocus}) => {

    const [value, setValue] = useState({
        arrayFor: Array(12).fill(' ')
    });

    useEffect(() => {
        if (array && array.length !== 0) {
            setValue(value => ({...value, arrayFor: array}));
        }
        if (inputs) {
            setValue(value => ({...value, arrayFor: Array(inputs).fill('')}));
        }
    }, [array, inputs]);

    return (
        <ul className={classes.list}>
            {value.arrayFor.map((item, i) => (
                <li className={classes.listItem} key={i}>
                    {i + 1}.
                    {item.length
                        ? <span className={classes.itemSpan} key={i}>{item}</span>
                        : <input
                            data-id={i}
                            onChange={onChange}
                            onFocus={onFocus}
                            className={classes.itemInput}
                            type="text"
                            key={i}
                        />
                    }
                </li>
            ))}
        </ul>
    );
}

export default SeedList;
