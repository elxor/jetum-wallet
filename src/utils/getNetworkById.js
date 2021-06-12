export const getNetworkById = id => {
    switch (Number(id)) {
        case 1:
            return {network: "Mainnet", symbol: "ETH"};
        case 3:
            return {network: "Ropsten", symbol: "ROP"};
        case 42:
            return {network: "Kovan", symbol: "KOV"};
        case 4:
            return {network: "Rinkeby", symbol: "RIN"};
        case 5:
            return {network: "Goerli", symbol: "GoETH"};
        default:
            return '';
    }
}