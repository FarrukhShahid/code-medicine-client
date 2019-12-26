import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                        <div className="card mt-5">
                            <h5 className="card-header info-color white-text text-center py-4">
                                <strong>Sign in</strong>
                            </h5>
                            <div className="card-body px-lg-5 pt-0">
                                <form className="text-center" autoComplete="nope" style={{ color: "#757575", action: "#!" }}>
                                    <div className="md-form">
                                        <input type="email" id="materialLoginFormEmail" className="form-control"/>
                                        <label for="materialLoginFormEmail">E-mail</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="password" id="materialLoginFormPassword" className="form-control" />
                                        <label for="materialLoginFormPassword">Password</label>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="materialLoginFormRemember" />
                                                <label className="form-check-label" for="materialLoginFormRemember">Remember me</label>
                                            </div>
                                        </div>
                                        <div>
                                            <a href="">Forgot password?</a>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Sign in</button>
                                    <p style={{ fontFamily: 'Roboto' }}>Not a member?<a href="" > Register</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
            </div>
        );
    }
}
export default  Login;