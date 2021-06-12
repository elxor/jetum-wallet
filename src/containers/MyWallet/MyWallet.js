import React, { useState } from 'react';
import classes from './MyWallet.module.scss';
import SendArea from '../SendArea/SendArea';
import AccountInfo from '../AccountInfo/AccountInfo';
import TokensArea from '../TokensArea/TokensArea';
import Dropdown from '../../components/Dropdown/Dropdown';
import Modal from '../../components/Modal/Modal';
import GasSettings from '../GasSettings/GasSettings';
import ShowPrivateKey from '../../components/ShowPrivateKey/ShowPrivateKey';

const MyWallet = () => {
    const [state, setState] = useState({
        dropdown: false,
        modalPrivKey: false,
        modalGas: false
    });

    const clickEllipsisHandler = e => {
        setState({...state, dropdown: !state.dropdown });
        e.stopPropagation();
    }

    const showPrivateKeyHandler = () => {
        setState(state => ({
            ...state,
            modalPrivKey: true,
            dropdown: false
        }));
    }

    const gasSettingsHandler = () => {
        setState(state => ({
            ...state,
            modalGas: true,
            dropdown: false
        }));
    }

    const modalPrivKeyToogleHandler = () => {
        setState(state => ({
            ...state,
            modalPrivKey: !state.modalPrivKey
        }));
    }

    const modalGasToogleHandler = () => {
        setState(state => ({
            ...state,
            modalGas: !state.modalGas
        }));
    }

    return (
        <div className={`${classes.main} container`}>

            <div className={classes.header}>
                <h2 className={classes.title}>
                    My Wallet
                </h2>
                <i
                    onClick={clickEllipsisHandler}
                    className={`fa fa-ellipsis-h ${classes.iconEllipsis}`} aria-hidden="true"
                ></i>

                {state.dropdown && <Dropdown
                    onClick={clickEllipsisHandler}
                    showPrivateKey={showPrivateKeyHandler}
                    gasSettings={gasSettingsHandler}
                />}
            </div>

            <div className={classes.content}>
                <div className={classes.sendField}>
                    <SendArea />
                </div>
                <div className={classes.sidebarUpper}>
                    <AccountInfo />
                </div>
                <div className={classes.sidebarBottom}>
                    <TokensArea />
                </div>
            </div>

            {state.modalPrivKey && <Modal onClick={modalPrivKeyToogleHandler}>
                <ShowPrivateKey />
            </Modal>}
            {state.modalGas && <Modal onClick={modalGasToogleHandler}>
                <GasSettings />
            </Modal>}
        </div>
    );
}

export default MyWallet;
