import * as bip39 from 'bip39';

export const generateMnemonic= (param = false) => {
    if (param) {
        const words = bip39.generateMnemonic(256);
        return words.split(' ');
    }
    const words = bip39.generateMnemonic(128);
    return words.split(' ');
}