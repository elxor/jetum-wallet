import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import classes from './SendOffline.module.scss';
import { logoutAccount } from '../../redux/actions/account';
import { getChainId } from '../../utils/getChainId';
import { getProvider } from '../../utils/getProvider';
import { decodeRawTx } from '../../utils/decodeRawTx';
import { downloadFile } from '../../utils/downloadFile';
import { readFile } from '../../utils/readFile';
import SelectedNet from '../../containers/SendOfflineItems/SelectedNet/SelectedNet';
import GenerateInfo from '../../containers/SendOfflineItems/GenerateInfo/GenerateInfo';
import SignedTx from '../../containers/SendOfflineItems/SignedTx/SignedTx';
import TxDetails from '../../containers/SendOfflineItems/TxDetails/TxDetails';
import TxStatus from '../../containers/SendOfflineItems/TxStatus/TxStatus';

const SendOffline = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAccount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, setState] = useState({
        network: '',
        chainId: '',
        address: '',
        addressValid: false,
        nonce: '',
        rawTx: '',
        txData: {},
        warning: '',
        txDataValid: false,
        sendLoading: false,
        txStatus: false,
        txHash: '',
        txError: false,
        txErrorMessage: ''
    });

    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });

    const gasPrice = useSelector(reduxState => {
        return reduxState.data.gasPrice;
    });

    useEffect(() => {
        const upperNetName = network[0].toUpperCase()
            + network.slice(1);

        const chainId = getChainId(network);

        setState(state => ({
            ...state,
            network: upperNetName,
            chainId: chainId
        }));
        
        if (state.addressValid) {
            const web3 = new Web3(getProvider(network));

            web3.eth.getTransactionCount(state.address).then(
                result => {
                    setState(state => ({
                        ...state,
                        nonce: result
                    }));
                },
                error => {
                    setState(state => ({
                        ...state,
                        nonce: 'error'
                    }));

                    console.log(error);
                }
            );
        }
    }, [network, state.address, state.addressValid]);

    const addressInputHandler = e => {
        const valid = Web3.utils.isAddress(e.target.value);

        setState(state => ({
            ...state,
            address: e.target.value,
            addressValid: valid
        }));
    }

    const exportFileBtnClickHandler = () => {
        const timeNow = Date.now();
        const gasToWei = Web3.utils.toWei(gasPrice.toString(), 'gwei');

        const data = {
            address: state.address,
            gasPrice: gasToWei,
            nonce: state.nonce,
            chainID: state.chainId,
            networkName: state.network,
            timestamp: timeNow
        }

        const dataJson = JSON.stringify(data);
        const fileName = `generated-offline-tx-${timeNow}.json`;

        downloadFile(fileName, dataJson);
    }

    const uploadFileHandler = e => {
        const file = e.target.files[0];

        const fileTypes = ['text/plain', 'application/json'];

        if (fileTypes.indexOf(file.type) !== -1) {
            readFile(file).then(
                result => {
                    const rawObject = JSON.parse(result);

                    if (rawObject.rawTransaction) {
                        setState(state => ({
                            ...state,
                            rawTx: rawObject.rawTransaction,
                            warning: '',
                            txDataValid: true
                        }));
                    } else {
                        setState(state => ({
                            ...state,
                            txData: {},
                            warning: 'Error: Data undefined!',
                            txDataValid: false
                        }));
                    }
                },
                error => {
                    setState(state => ({
                        ...state,
                        txData: {},
                        warning: error.message,
                        txDataValid: false
                    }));
                }
            );
        } else {
            setState(state => ({
                ...state,
                txData: {},
                warning: 'Error: Invalid file type!',
                txDataValid: false
            }));
        }
    }

    const rawTxTextAreaHandler = e => {
        setState(state => ({
            ...state,
            rawTx: e.target.value
        }));
    }

    const validationSignerData = (decodedTxData) => {

        const signerAddress = decodedTxData.sender;
        const signedChainId = decodedTxData.chainId;

        const cond1 = 
            signerAddress.toLowerCase() === state.address.toLowerCase();

        const cond2 = 
            Number(signedChainId) === Number(state.chainId);

        if (cond1 && cond2) {
            setState(state => ({
                ...state,
                txData: decodedTxData,
                warning: '',
                txDataValid: true
            }));

        } else if (cond1 && (cond1 || cond2)) {

            setState(state => ({
                ...state,
                txData: {},
                warning: 'Warning: Signed Chain ID does not match chain id for selected network!',
                txDataValid: false
            }));

        } else if (cond2 && (cond1 || cond2)) {

            setState(state => ({
                ...state,
                txData: {},
                warning: 'Warning: Signer does not match selected address!',
                txDataValid: false
            }));

        } else {

            setState(state => ({
                ...state,
                txData: {},
                warning: 'Warning: Signed data does not match selected data!',
                txDataValid: false
            }));
        }
    }

    const viewTxDetailsClickHandler = () => {
        setState(state => ({
            ...state,
            txStatus: false,
            txHash: '',
            txError: false,
            txErrorMessage: ''
        }));

        try {
            const decodedTxData = decodeRawTx(state.rawTx);

            validationSignerData(decodedTxData);

        } catch (e) {
            setState(state => ({
                ...state,
                txData: {},
                warning: 'Error: ' + e.message,
                txDataValid: false
            }));
        }
    }

    const sendTransaction = () => {
        setState(state => ({
            ...state,
            sendLoading: true
        }));

        const web3 = new Web3(getProvider(network));

        web3.eth.sendSignedTransaction(state.rawTx, (err, res) => {
            if (err) {
                console.log(err);

                setState(state => ({
                    ...state,
                    sendLoading: false,
                    txStatus: true,
                    txHash: '',
                    txError: true,
                    txErrorMessage: err.message
                }));
            }
            if (res) {
                setState(state => ({
                    ...state,
                    address: '',
                    addressValid: false,
                    sendLoading: false,
                    txStatus: true,
                    txHash: res,
                    txError: false,
                    txErrorMessage: ''
                }));
            }
        });
    }


    return (
        <div className={`${classes.main} container`}>
            <h2 className={classes.title}>Send Offline Helper</h2>
            <div className={classes.content}>
                <SelectedNet network={network} />
                <GenerateInfo
                    onChangeAddressInput={addressInputHandler}
                    onClickExportFileBtn={exportFileBtnClickHandler}
                    addressValue={state.address}
                    data={{
                        network: state.network,
                        chainId: state.chainId,
                        address: state.address,
                        nonce: state.nonce,
                        addressValid: state.addressValid
                    }}
                />
                <SignedTx
                    onChangeUploadFile={uploadFileHandler}
                    onChangeTextArea={rawTxTextAreaHandler}
                    valueTextArea={state.rawTx}
                    onClickViewTxDetails={viewTxDetailsClickHandler}
                    warning={state.warning}
                    txDataValid={state.txDataValid}
                />
                <TxDetails
                    txData={state.txData}
                    selectedChainId={state.chainId}
                    onClickSendTransaction={sendTransaction}
                    sendLoading={state.sendLoading}
                />
                <TxStatus
                    txStatus={state.txStatus}
                    txHash={state.txHash}
                    txError={state.txError}
                    txErrorMessage={state.txErrorMessage}
                />
            </div>
        </div>
    );
}

export default SendOffline;
