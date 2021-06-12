export const getChainId = network => {
    switch (network) {
        case "mainnet":
            return 1;
        case "ropsten":
            return 3;
        case "kovan":
            return 42;
        case "rinkeby":
            return 4;
        case "goerli":
            return 5;
        default:
            return '';
    }
}