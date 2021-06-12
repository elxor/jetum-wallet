import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../../redux/actions/account';
import classes from './CreateWallet.module.scss';
import Tabs from '../../components/Tabs/Tabs';
import CreateKeystore from '../../containers/CreateKeystore/CreateKeystore';
import CreateMnemonic from '../../containers/CreateMnemonic/CreateMnemonic';
import CreatePrivateKey from '../../containers/CreatePrivateKey/CreatePrivateKey';


const CreateWallet = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAccount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const items = [
        { title: 'By Keystore File', content: <CreateKeystore /> },
        { title: 'By Mnemomic Phrase', content: <CreateMnemonic /> },
        { title: 'By Private Key', content: <CreatePrivateKey /> }
    ];

    return (
        <div className={`${classes.main} container`}>
            <div className={classes.header}>
                <h2 className={classes.title}>Get a New Wallet</h2>
                <p>
                    Already have a wallet?
                    <Link to="/access-wallet">
                        <span className={classes.textLink}>Access My Wallet</span>
                    </Link>
                </p>
            </div>

            <Tabs props={items} />
            
        </div>
    );
}

export default CreateWallet;
