export const getSymbolByNetwork = network => {
    switch (network) {
        case "ropsten":
            return "ROP";
        case "kovan":
            return "KOV";
        case "rinkeby":
            return "RIN";
        case "goerli":
            return "GoETH";
        default:
            return "ETH";
    }
}