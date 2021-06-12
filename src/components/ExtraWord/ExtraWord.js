import React, { useState } from 'react';
import classes from './ExtraWord.module.scss';
import Tooltip from '../Tooltip/Tooltip';
import InputPassword from '../InputPassword/InputPassword';
import SimpleSwitch from '../SimpleSwitch/SimpleSwitch';

const popupText = {
    text1: "You can add an extra word to your phrase for added security. However, you will need this word everytime you wish to access your phrase. Some wallets may not support adding an extra word when using mnemonic phrases.",
    text2: "Some mnemonic phrases are generated with an extra word chosen by the user for added security. It acts as a 13th or 25th word to your phrase, sometimes referred to as a 'password'. If you did not create an extra word when you made your phrase, you should leave this field blank."
}

const ExtraWord = (props) => {

    const [state, setState] = useState({
        checked: false
    });
    
    const checkboxHandler = () => {
        setState(state => ({
            ...state,
            checked: !state.checked
        }));
        props.clearValue && props.clearValue();
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.visiblePart}>
                <div className={classes.title}>
                    <span className={classes.span}>
                        {props.page ? 'Extra Word' : 'Do you have an Extra Word?'}
                    </span>
                    <Tooltip
                        hoverText={props.page ? popupText.text1 : popupText.text2}
                    />
                </div>
                <div className={classes.switcherWrapper}>
                    {props.page
                        ? <span>Optional</span>
                        : state.checked ? <span>Yes</span> : <span>No</span>
                    }
                    <SimpleSwitch
                        id="extraWordId"
                        onChange={checkboxHandler}
                        checked={state.checked}
                    />
                </div>
            </div>
            {state.checked &&
                <div className={classes.hiddenPart}>
                    <InputPassword
                        placeholder={props.page
                            ? "Please Enter At Least 6 Characters"
                            : "Type in your extra word"
                        }
                        onChange={props.onChange}
                        value={props.value}
                    />
                    {props.page && 
                        <p className={classes.description}>
                            If you choose to include an extra word, understand you will ALWAYS need this extra word with your mnemonic phrase. You can not change it. It becomes a permanent part of your phrase.
                        </p>
                    }
                </div>
            }
        </div>
    );
}

export default ExtraWord;