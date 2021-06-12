import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAccount } from '../../redux/actions/account';
import classes from './Home.module.scss';
import CardBlock from '../../components/CardBlock/CardBlock';
import Preloader from '../../components/Preloader/Preloader';
import logo from '../../assets/img/logo.svg';

const blockCreate = {
    icon: 'icon-create',
    title: 'Create A New Wallet',
    text: 'Generate your own unique Ethereum wallet. Receive a public address (0x...) and choose a method for access and recovery.',
    start: 'Get Started'
}

const blockAccess = {
    icon: 'icon-access',
    title: 'Access My Wallet',
    text: 'Connect to the blockchain using the wallet. Get access to your Ethers or ERC20 Tokens. Send and receive your funds.',
    start: 'Access Now'
}

const Home = () => {
    const [preloader, setPreloader] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAccount());
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.homeWrapper}>
            {preloader && <Preloader />}
            <div className={`${classes.main} container`}>

                <div className={`${classes.row} ${classes.rowPaddingBottom}`}>
                    <div className={classes.description}>
                        <h1 className={classes.title}>
                            Just Ethereum Wallet
                        </h1>
                        <p className={classes.text}>Just Ethereum Wallet (or JetumWallet) is a free, client-side interface helping you interact with the Ethereum blockchain. Our easy-to-use, open-source platform allows you to generate wallets, send and receive Ethers or ERC20 Tokens.</p>
                    </div>
                    <div className={classes.logoWrapper}>
                        <img
                            src={logo}
                            alt="logo"
                            className={classes.logo}
                            onLoad={() => setPreloader(false)}
                            onError={() => setPreloader(false)}
                        />
                    </div>
                </div>

                <div className={`${classes.row} ${classes.rowPaddingTop}`}>
                    <CardBlock
                        to="/create-wallet"
                        customClass={classes.blockCreateStyle}
                        content={blockCreate}
                    />
                    <CardBlock
                        to="/access-wallet"
                        customClass={classes.blockAccessStyle}
                        content={blockAccess}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;