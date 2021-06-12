import Web3 from 'web3';
import EthereumTx from 'ethereumjs-tx';
import { Decimal } from 'decimal.js';


export const decodeRawTx = (rawTxString) => {
    const tx = new EthereumTx(rawTxString);

    const gasPriceStr = Web3.utils
        .hexToNumberString('0x' + tx.gasPrice.toString('hex'));

    const valueStr = Web3.utils
        .hexToNumberString('0x' + tx.value.toString('hex'));

    const gasPrice = Web3.utils.fromWei(gasPriceStr, 'gwei');

    const gasLimit = parseInt(tx.gasLimit.toString('hex'), 16) || '0';

    const txFee = Decimal
        .mul(+gasPrice, +gasLimit)
        .div(1000000000).toNumber();

    const txData = {
        sender: '0x' + tx.from.toString('hex'),
        receiver: '0x' + tx.to.toString('hex'),
        nonce: parseInt(tx.nonce.toString('hex') || '0', 16),
        value: Web3.utils.fromWei(valueStr, 'ether'),
        data: '0x' + tx.data.toString('hex'),
        chainId: tx._chainId,
        gasLimit,
        gasPrice,
        fee: txFee,
        isTxData: true
    }

    return txData;
}
