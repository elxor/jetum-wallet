import React, { useState } from 'react';
import classes from './DownloadKeystore.module.scss';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import CreateSuccess from '../../components/CreateSuccess/CreateSuccess';
import { downloadFile } from '../../utils/downloadFile';


const DownloadKeystore = (props) => {
    const [state, setState] = useState({
        modal: false
    });

    const modalToogleHandler = () => {
        setState(state => ({...state, modal: !state.modal}));
    }

    const downloadBtnClickHandler = () => {
        downloadFile(props.fileName, props.fileContent);
        modalToogleHandler();
    }

    return (
        <div className={classes.content}>
            <div className={classes.title}>
                Save Your Keystore File
            </div>
            <Button
                customClass={classes.downloadButton}
                onClick={downloadBtnClickHandler}
            >
                Download Keystore File
            </Button>
            <div className={classes.notice}>
                <div className={classes.noticeItem}>
                    <p className={classes.noticeRed}>Don't Lose It</p>
                    <p>It cannot be recovered if you lose it.</p>
                </div>
                <div className={classes.noticeItem}>
                    <p className={classes.noticeRed}>Don't Share It</p>
                    <p>Your funds will be stolen if you use this file on a malicious phishing site.</p>
                </div>
                <div className={classes.noticeItem}>
                    <p className={classes.noticeRed}>Make a Backup</p>
                    <p>Secure it like the millions of dollars it may one day be worth.</p>
                </div>
            </div>

            {state.modal && <Modal onClick={modalToogleHandler}>
                <CreateSuccess />
            </Modal>}

        </div>
    );
}

export default DownloadKeystore;