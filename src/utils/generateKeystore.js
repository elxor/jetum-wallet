import keythereum from 'keythereum';


export const generateKeystore = async (password) => {

    const params = { keyBytes: 32, ivBytes: 16 };
    const dk = keythereum.create(params);

    const options = {
        kdf: "scrypt",
        cipher: "aes-128-ctr",
        kdfparams: {dklen: 32, n: 131072, r:8, p:1}
    };

    const result = await new Promise(resolve => {
        keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options, keyObject => {

            const name = `UTC--${new Date()
                .toISOString().replace(/[:]/g, '-')}--${keyObject.address}`;
    
            const jsonContent = keythereum.exportToFile(keyObject);

            resolve([name, jsonContent]);
        });
    });

    return result;
}