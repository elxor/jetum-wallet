import keythereum from 'keythereum';
import Web3 from 'web3';

export const getAccoutFromFile = (jsonObject, password) => {
    const keyObject = JSON.parse(jsonObject);
    
    const address = Web3.utils.toChecksumAddress(keyObject.address);
    const privateKey = keythereum.recover(password, keyObject);

    return {
        address: address,
        privateKey: privateKey.toString('hex')
    }
}