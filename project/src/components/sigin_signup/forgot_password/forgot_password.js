import React, { useState } from 'react'
import Container from '../../../shared/container/container';
import Inputfield from '../../../shared/customs/inputfield/inputfield';
import { LOGIN_URL } from '../../../shared/router_constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { notify } from '../../../actions';


function ForgotPassword(props) {

    const [email,set_email] = useState('')
    const [error,set_error] = useState(false)

    function on_change(e) {
        set_email(e.target.value)
        set_error(false)
    }

    function on_submit() {
        if (email === '')
            set_error(true)
            return
        
        // props.history.push(LOGIN_URL)
    }

    return (
        <Container container_type={'darmian_me'}>
            <div className="card shadow">
                <div className="card-header">
                    <h4>Reset your password</h4>
                </div>
                <div className="card-body px-4" >
                    <Inputfield
                        id="email_text_input"
                        label_tag="Email"
                        placeholder="Enter your email"
                        icon_class="icon-envelop"
                        input_type={'email'}
                        on_text_change_listener={(e) => on_change(e)}
                        default_value={email}
                        error={error}
                    />
                </div>
                
                <div className="card-footer">
                    <button className="btn bg-teal-400 btn-labeled btn-labeled-right pr-5 float-right"
                        onClick={() => on_submit()}>
                        <b><i className="icon-user-check" /></b>
                        Sumit Request
                    </button>
                </div>
                
            </div>
            
        </Container>
    )
}
export default connect(null, notify)(withRouter(ForgotPassword));