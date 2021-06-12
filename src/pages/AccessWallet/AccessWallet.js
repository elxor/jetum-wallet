import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './AccessWallet.module.scss';
import Tabs from '../../components/Tabs/Tabs';
import AccessKeystore from '../../containers/AccessKeystore/AccessKeystore';
import AccessMnemonic from '../../containers/AccessMnemonic/AccessMnemonic';
import AccessPrivateKey from '../../containers/AccessPrivateKey/AccessPrivateKey';
import MyWallet from '../../containers/MyWallet/MyWallet';


const AccessWallet = () => {

    const accessAccount = useSelector(reduxState => {
        return reduxState.account.accountAccess;
    });

    const items = [
        { title: 'By Keystore File', content: <AccessKeystore /> },
        { title: 'By Mnemomic Phrase', content: <AccessMnemonic /> },
        { title: 'By Private Key', content: <AccessPrivateKey /> }
    ];

    if (accessAccount) {
        return <MyWallet />
    }
    return (
        <div className={`${classes.main} container`}>
            <div className={classes.header}>
                <h2 className={classes.title}>Access My Wallet</h2>
                <p>
                    Do not have a wallet?
                    <Link to="/create-wallet">
                        <span className={classes.textLink}>Create A New Wallet</span>
                    </Link>
                </p>
            </div>

            <Tabs props={items} />
            
        </div>
    );
}

export default AccessWallet;