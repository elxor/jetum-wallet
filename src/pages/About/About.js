import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../../redux/actions/account';
import classes from './About.module.scss';

const About = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAccount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${classes.main} container`}>
            <div className={classes.content}>
                <div>
                    <p className={classes.title}>About</p>
                    <p className={classes.text}>JetumWallet is an open-source, client-side, free Ethereum wallet which allows you to send and receive Ethers or ERC20 Tokens securely. Connect to the Ethereum blockchain in your browser with JetumWallet.</p>
                </div>
                <div>
                    <p className={classes.title}>Secure</p>
                    <p className={classes.text}>Your security is important to us. JetumWallet doesn't store your seed, private key, keystore file, transactions, ip address or browser details. No email address or personal information is needed to use our service.</p>
                </div>
            </div>
            
        </div>
    );
}

export default About;