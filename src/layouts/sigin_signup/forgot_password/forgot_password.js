import React, { Fragment, useState } from 'react'
import Inputfield from '../../../components/inputfield';
import { withRouter } from 'react-router-dom';


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
        <Fragment>
            <div className="card shadow w-lg-50 w-md-75 w-100">
                <div className="card-header">
                    <h4>Reset your password</h4>
                </div>
                <div className="card-body px-4" >
                    <Inputfield
                        id="email_text_input"
                        label_tag="Email"
                        placeholder="Enter your email"
                        icon_class="icon-envelop"
                        type={'email'}
                        onChange={(e) => on_change(e)}
                        defaultValue={email}
                        error={error}
                    />
                </div>
                
                <div className="card-footer">
                    <button className="btn bg-teal-400 btn-labeled btn-labeled-right pr-5 float-right"
                        onClick={() => on_submit()}>
                        <b><i className="icon-user-check" /></b>
                        Submit Request
                    </button>
                </div>
                
            </div>
            
        </Fragment>
    )
}
export default withRouter(ForgotPassword);