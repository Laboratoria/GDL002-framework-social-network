import React, { Component } from "react";
import { forgotPassword } from "../auth";
import '../style/bckgStyle.css';
import '../style/loginStyle.css';
 
class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: ""
    };
 
    forgotPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message });
            }
        });
    };
 
    render() {
        
        return (
    
            <div className="container ">
                <h2 className="mt-5 mb-5">Password Reset</h2>
 
                {this.state.message && (
                    <h4 className="bg-success">{this.state.message}</h4>
                )}
                {this.state.error && (
                    <h4 className="bg-warning">{this.state.error}</h4>
                )}
                <div className="container h-100 bckg-forgot">
        <div className="d-flex justify-content-center h-100">
            <div className="user_card">
            <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                    <img src="https://cdn.dribbble.com/users/2296468/screenshots/5637499/image.gif" className="brand_logo" alt="Logo" />
                </div>
            </div>
                <div className="d-flex justify-content-center form-container">
                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Send Password Rest Link
                    </button>
                </form>
                </div>
            </div>
        </div>
        </div>
        </div>
        );
    }
}
 
export default ForgotPassword;