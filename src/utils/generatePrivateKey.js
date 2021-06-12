import Web3 from 'web3';

const web3 = new Web3();

export const generatePrivateKey = () => {
    const account = web3.eth.accounts.create();
    
    const address = account.address;
    const privateKey = web3.utils.stripHexPrefix(account.privateKey);

    return {address, privateKey};
}