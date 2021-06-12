import * as bip39 from 'bip39';
import hdkey from 'hdkey';
import { privateToPublic, publicToAddress } from 'ethereumjs-util';
import Web3 from 'web3';

export const getAccountsFromMnemonic = (mnemonic, path = "m/44'/60'/0'/0", range, extraWord = '') => {
    const num1 = range.start || 0;
    const num2 = range.end || 5;

    const seed = bip39.mnemonicToSeedSync(mnemonic, extraWord);
    const root = hdkey.fromMasterSeed(seed);

    const accounts = {};

    for (let i = num1; i < num2; i++) {
        const wallets = root.derive(path + '/' + i);

        const pubKey = privateToPublic(wallets._privateKey);

        const address = publicToAddress(pubKey).toString('hex');
        const checkSumAddress = Web3.utils.toChecksumAddress(address);
        const privateKey = wallets._privateKey.toString('hex');

        accounts[i] = {address: checkSumAddress, privateKey: privateKey}
    }

    return accounts;
}