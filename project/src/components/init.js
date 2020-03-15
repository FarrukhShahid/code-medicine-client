import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { BASE_URL, 
        LOGIN_URL, 
        REGISTER_URL, 
        PROFILE, 
        RECEPTION_TODAYSPATIIENT, 
        RECEPTION_VISITS } from '../shared/router_constants';
import Home from './home/home';
import Login from './login/login';
import Register from './register/register';
import Profile from './profile/profile';
import { ToastContainer } from 'react-toastify';
import Todayspatient from './reception/todayspatient/todayspatient';
import Visits from './reception/visits/visits';

class Init extends Component {
    render(){
        return(
            <BrowserRouter >
                <Route exact path={BASE_URL} component={Home} />
                <Route exact path={LOGIN_URL} component={Login} />
                <Route exact path={REGISTER_URL} component={Register} />
                <Route exact path={PROFILE} component={Profile} />
                <Route exact path={RECEPTION_TODAYSPATIIENT} component={Todayspatient} />
                <Route exact path={RECEPTION_VISITS} component={Visits} />
                <ToastContainer hideProgressBar />
            </BrowserRouter>
        );
    }
}
export default Init;