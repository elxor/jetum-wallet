import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './App.module.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import CreateWallet from './pages/CreateWallet/CreateWallet';
import AccessWallet from './pages/AccessWallet/AccessWallet';
import SendOffline from './pages/SendOffline/SendOffline';
import PageNotFound from './pages/PageNotFound/PageNotFound';


const App = () => {
    return (
        <Fragment>
            <div className={classes.wrapper}>
                <Header />

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/create-wallet" component={CreateWallet} />
                    <Route path="/access-wallet" component={AccessWallet} />
                    <Route path="/send-offline-helper" component={SendOffline} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </div>
            
            <Footer />
        </Fragment>
    );
}

export default App;