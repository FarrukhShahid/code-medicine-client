import React, { Component } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import Leftsidebar from './left_sidebar/left_sidebar';
import Pageheader from './page_header/page_header';
import { connect } from "react-redux";
// import Axios from 'axios';
// import { PROFILE_USER_REQUEST } from '../rest_end_points';
// import { LOGIN_URL } from '../router_constants';
import { withRouter } from 'react-router-dom';
import { set_active_user,notify } from '../../actions';
import './container.css'
import '../customs/Animations/animations.css'
// import BACKGROUND from '../../resources/images/background_image.jpg'


class Container extends Component {
    constructor(props){
        super(props);
            this.state = {
                type: this.props.container_type,
                user_auth_check_interval: null
            };
    }

    // componentWillUnmount(){
    //     clearInterval(this.state.user_auth_check_interval)
    // }

    componentDidMount() {
        // if (localStorage.getItem('user') || this.props.active_user){
        //     this.setState({user_auth_check_interval: setInterval(() => {
        //         console.log('user',this.props.active_user);
        //         Axios.get(`${PROFILE_USER_REQUEST}?tag=${localStorage.user}`).then(res => {
        //             if (!res.data['status']){
        //                 this.props.history.push(LOGIN_URL)
        //             }
        //             else{
        //                 this.props.set_active_user(res.data['payload'])
        //             }
        //         })
        //     },5000)})
        // }
    }
    render() {
        var header = ''
        var footer = ''
        var left_sidebar = ''
        var page_header = ''

        switch(this.state.type){
            case 'login':
                header = false
                footer = false
                left_sidebar = false
                page_header = false
                break;
            case 'register':
                header = false
                footer = false
                left_sidebar = false
                page_header = false
                break;
            default:
                header = true
                footer = true
                left_sidebar = true
                page_header = true
                break;
        }

        return (
            <div className={`virtual-body ${header? 'navbar-top':''} ${this.props.left_sidebar? (window.innerWidth >= 500? 'sidebar-xs':'sidebar-mobile-main'):''}`}
                // style={{backgroundImage: `url(${BACKGROUND})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition:'center'}}
                >
                {header? <Header /> : ''}
                <div className="page-content">

                    {left_sidebar? <Leftsidebar /> : ''}

                    <div className="content-wrapper">
                        
                        {page_header? <Pageheader /> : ''}

                        <div className={`content ${this.state.type === 'login'? 'p-0':this.state.type === 'register'? 'p-0':'' }`}>
                            {
                                this.props.children
                            }
                        </div>
                        {footer? <Footer /> : ''}
                    </div>
                </div>
            </div>
        );
    }
}
function map_state_to_props(state) {
    return { 
        left_sidebar: state.left_sidebar,
        active_user: state.active_user
     }
}
export default connect(map_state_to_props, {notify, set_active_user})(withRouter( Container));