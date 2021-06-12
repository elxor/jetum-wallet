import React, { useState, useEffect } from 'react';
import classes from './VerifyMnemonic.module.scss';
import SeedList from '../../components/SeedList/SeedList';
import Button from '../../components/Button/Button';
import CreateSuccess from '../../components/CreateSuccess/CreateSuccess';
import InputPassword from '../../components/InputPassword/InputPassword';
import { removeRandomWords, trimObjValues, compareObjects } from '../../utils/helpers';


const VerifyMnemonic = (props) => {

    const [state, setState] = useState({
        isVerification: false,
        warning: false,
        extraWord: '',
        errorText: ''
    });

    const [wordsToVerify, setWordsToVerify] = useState({});

    const [inputWords, setInputWords] = useState({});

    useEffect(() => {
        setWordsToVerify(removeRandomWords(props.array, 5));
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickHandler = () => {
        const trimInputWords = trimObjValues(inputWords);

        const isEqualWords = compareObjects(wordsToVerify.removedWords, trimInputWords);

        const isEqualExtraWord = state.extraWord === props.extraWord;

        if (isEqualWords && isEqualExtraWord) {
            setState(state => ({
                ...state,
                isVerification: true
            }));
        } else if (isEqualWords && (isEqualWords || isEqualExtraWord)) {
            setState(state => ({
                ...state,
                warning: true,
                errorText: "Extra Word "
            }));
        } else if (isEqualExtraWord && (isEqualWords || isEqualExtraWord)) {
            setState(state => ({
                ...state,
                warning: true,
                errorText: "Mnemonic "
            }));
        } else {
            setState(state => ({
                ...state,
                warning: true,
                errorText: "Mnemonic and Extra Word "
            }));
        }      
    }

    const seedListHandler = e => {
        setInputWords(inputWords => ({
            ...inputWords,
            [e.target.dataset.id]: e.target.value
        }));
    }

    const onFocusHandler = e => {
        e.target.parentNode.style.borderBottomColor = '#000';
    }

    const extraWordInputHandler = e => {
        setState(state => ({
            ...state,
            extraWord: e.target.value
        }));
    }

    if (state.isVerification) {
        return (
            <CreateSuccess />
        )
    }
    return (
        <div className={classes.body}>
            <div className={classes.description}>
                <h2 className={classes.title}>Verification</h2>
                <p>Please enter and fill out the empty boxes below to verify your mnemonic phrase key</p>
            </div>

            <SeedList
                onChange={seedListHandler}
                onFocus={onFocusHandler}
                array={wordsToVerify.array}
            />

            {props.extraWord !== '' &&
                <div className={classes.extraWordWrapper}>
                    <p>Extra Word</p>
                    <InputPassword
                        customClass={classes.extraWordInput}
                        placeholder="Type in your extra word"
                        onChange={extraWordInputHandler}
                    />
                </div>
            }
            
            {state.warning &&
                <p className={classes.notice}>
                    {state.errorText}
                    doesn't match! Please write it down correctly!
                </p>
            }

            <Button
                customClass={classes.button}
                onClick={clickHandler}
            >Verify</Button>

        </div>
    );
}

export default VerifyMnemonic;
