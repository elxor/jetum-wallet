import Web3 from 'web3';

const web3 = new Web3();

export const getAccountFromPrivateKey = privKey => {
    const account = web3.eth.accounts.privateKeyToAccount(privKey);

    return {
        address: account.address,
        privateKey: web3.utils.stripHexPrefix(account.privateKey)
    }
}