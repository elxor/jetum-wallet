import Web3 from 'web3';
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

export const getProvider = (network) => {
   
    const provider = new Web3.providers.HttpProvider(
        `https://${network}.infura.io/v3/${INFURA_KEY}`
    );

    return provider;
}