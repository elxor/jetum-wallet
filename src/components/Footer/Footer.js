import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={`${classes.content} container`}>
                <div className={classes.overline}>
                    <div className={classes.left}>
                        <p className={classes.item}>
                            <Link to="/about" className={classes.link}>About</Link>
                        </p>
                        <p className={classes.item}>
                            <Link to="/send-offline-helper" className={classes.link}>Send Offline Helper</Link>
                        </p>
                        <p className={classes.item}>
                            <a className={classes.link} href="https://github.com/elxor/jetum-wallet-offline#readme" target="_blank" rel="noopener noreferrer">JetumWallet Offline</a>
                        </p>
                        <p className={classes.item}>
                            <a className={classes.link} href="https://elxor.github.io/eth-key-utils/" target="_blank" rel="noopener noreferrer">Advanced Key Utils</a>
                        </p>
                        <p className={classes.item}>
                            <a className={classes.link} href="https://etherscan.io/" target="_blank" rel="noopener noreferrer">Ethereum Explorer</a>
                        </p>
                        <p className={classes.item}>
                            <a className={classes.link} href="https://github.com/elxor/jetum-wallet" target="_blank" rel="noopener noreferrer">Github</a>
                        </p>
                    </div>
                    <div className={classes.right}>
                        <p className={classes.item}>
                            <i className={`fa fa-plus-square-o ${classes.iconFooter}`}></i>
                            Donate
                        </p>
                        <p className={`${classes.item} ${classes.textSize}`}>
                            JetumWallet is open-source and free to the community. Your donations go a long way towards making that possible.</p>
                        <p className={classes.item}>
                            <a className={classes.link} href="https://etherscan.io/address/0x52Ca1670aEfB2b34515d140c1d67E0cF6686DD8A" target="_blank" rel="noopener noreferrer">
                                <i className={`icon icon-eth ${classes.iconFooter}`}></i>
                                Ethereum Donation
                            </a>
                        </p>
                        <p className={classes.item}>
                            <a className={classes.link} href="https://www.blockchain.com/btc/address/bc1qq7l8r5pssx5jchzjgzvrkf52sujuk4umjtrul4" target="_blank" rel="noopener noreferrer">
                                <i className={`icon icon-btc ${classes.iconFooter}`}></i>
                                Bitcoin Donation
                            </a>
                        </p>
                    </div>
                </div>
                <div className={classes.line}></div>
                <div className={ `${classes.underline} ${classes.textSize}`}>
                    <p>Pricing taken from
                        <a className={`${classes.link} ${classes.linkColor}`} href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">Coingecko</a>
                    </p>
                    <p>&#169; {new Date().getFullYear()} JetumWallet. All Rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;