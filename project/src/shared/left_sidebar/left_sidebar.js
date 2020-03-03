import React, { Component } from 'react';
import { BASE_URL, LOGIN_URL, RECEPTION_TODAYSPATIIENT, RECEPTION_VISITS } from '../router_constants';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { set_active_user } from '../../actions'

class Left_sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            home_toggle: '',
            reception_toggle: '',
            current_page: 'Home'
        }
    }
    componentDidMount(){
        // console.log(this.props.active_user);
    }

    on_logout_button_click = () => {
        localStorage.clear()
        this.props.set_active_user({})
    }

    on_item_click = (e) => {
        switch(e.target.id){
            case 'home_link':
                if (this.state.home_toggle === '')
                    this.setState({home_toggle: 'nav-item-open'});
                else
                    this.setState({home_toggle: ''});
                break;
            case 'reception_link':
                if (this.state.reception_toggle === '')
                    this.setState({reception_toggle: 'nav-item-open'});
                else
                    this.setState({reception_toggle: ''});
                break;
            default:
                break;
        }
    } 
    render() {
        return (
            <div className="sidebar sidebar-dark sidebar-main sidebar-fixed sidebar-expand-md" >

                <div className="sidebar-mobile-toggler text-center">
                    <Link to={BASE_URL} className="sidebar-mobile-main-toggle">
                        <i className="icon-arrow-left8"></i>
                    </Link>
                    Menu
                    <Link to={BASE_URL} className="sidebar-mobile-expand">
                        <i className="icon-screen-full"></i>
                        <i className="icon-screen-normal"></i>
                    </Link>
                </div>

                <div className="sidebar-content">
                    <div className="sidebar-user">
                        <div className="card-body">
                            <div className="media">
                                <div className="mr-3">
                                    <Link to={BASE_URL}>
                                        <i className="icon-user"></i>
                                    </Link>
                                </div>

                                <div className="media-body">
                                    <div className="media-title font-weight-semibold">
                                        {this.props.active_user['first_name']} {this.props.active_user['last_name']}                                 
                                    </div>
                                    <div className="font-size-xs opacity-50">
                                        <i className="icon-pin font-size-sm"></i> &nbsp;Islamabad, Pakistan
                                    </div>
                                </div>

                                <div className="ml-3 align-self-center">
                                    <Link to={BASE_URL}  className="text-white"><i className="icon-cog3"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="card card-sidebar-mobile">
                        <ul className="nav nav-sidebar">
                            <li className="nav-item-header">
                                <div className="text-uppercase font-size-xs line-height-xs">
                                    Main
                                </div>
                            </li>
                            <li className={`nav-item nav-item-submenu ${this.state.home_toggle}`}>
                                <Link className="nav-link" 
                                    to={'#'} 
                                    onClick={this.on_item_click}
                                    id="home_link">
                                    <i className="icon-home4"></i>
                                    <span className="">Home</span>
                                </Link>

                                <ul className="nav nav-group-sub" 
                                    data-submenu-title="Home"
                                    style={{display: this.state.home_toggle === ''? 'none':'block'}}>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link active">Dashboard</Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link disabled">Messages<span className="badge bg-transparent align-self-center ml-auto">Coming soon</span></Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link">Patients</Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link">Doctors</Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link disabled">Requests<span className="badge bg-transparent align-self-center ml-auto">Coming soon</span></Link></li>
                                </ul>

                            </li>
                            <li className={`nav-item nav-item-submenu ${this.state.reception_toggle}`}>
                                <Link className="nav-link" 
                                    to={'#'} 
                                    onClick={this.on_item_click}
                                    id="reception_link">
                                    <i className="icon-user"></i>
                                    <span>Reception</span>
                                </Link>

                                <ul className="nav nav-group-sub" data-submenu-title="Reception"
                                    style={{display: this.state.reception_toggle === ''? 'none':'block'}}>
                                    <li className="nav-item"><Link to={RECEPTION_TODAYSPATIIENT} className="nav-link active">Today's Patients</Link></li>
                                    <li className="nav-item"><Link to={RECEPTION_VISITS} className="nav-link">All appointments</Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link disabled">Emergency<span className="badge bg-transparent align-self-center ml-auto">Coming soon</span></Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link disabled">Admissions<span className="badge bg-transparent align-self-center ml-auto">Coming soon</span></Link></li>
                                    <li className="nav-item"><Link to={BASE_URL} className="nav-link disabled">Requests<span className="badge bg-transparent align-self-center ml-auto">Coming soon</span></Link></li>
                                </ul>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={this.on_logout_button_click} to={LOGIN_URL}>
                                    <i className="icon-exit3"></i>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>


                </div>


            </div >
        );
    }
}
function map_state_to_props(state) {
    return { 
        active_user: state.active_user
    }
}
export default connect(map_state_to_props,{set_active_user})(withRouter(Left_sidebar));