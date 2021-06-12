import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.scss';
import Select from '../Select/Select';
import { getEthPrice, getGasPrice } from '../../redux/actions/data';
import { changeNetwork } from '../../redux/actions/network';


const Header = () => {

    const dispatch = useDispatch();
    
    const network = useSelector(reduxState => {
        return reduxState.network.infuraNetwork;
    });
    
    const gasPrice = useSelector(reduxState => {
        return reduxState.data.gasPrice
    });

    const selectNetworkHandler = e => {
        dispatch(changeNetwork(e.target.value));
    }

    useEffect(() => {
        dispatch(getEthPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getGasPrice(network));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [network]);
    

    return (
        <div className={classes.header}>
            <div className={`${classes.content} container`}>
                <Link exact="true" to="/" className={classes.title}>JETUM</Link>
                <div className={classes.info}>
                    <div className={classes.itemMargin}>
                        Gas Price: 
                        <span className={classes.data}>{gasPrice}</span>
                        Gwei
                    </div>
                    <div>
                        Network:&nbsp;
                        <Select
                            customClass={classes.select}
                            options={['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli']}
                            onChange={selectNetworkHandler}
                            value={network}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;