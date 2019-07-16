import React, {Component} from 'react';
import { signup } from '../auth';
import {Link} from 'react-router-dom';
import '../style/bckgStyle.css';
import '../style/loginStyle.css';

class Signup extends Component {
   constructor() {
       super()
       this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
       };
   }

    handleChange = name => event => {
        this.setState({error: ""}); //quitar el alert cuando se empieze a escribir
        this.setState({ [name]: event.target.value});
    };

    clickSubmit = event => {
        event.preventDefault();
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        };
        console.log(user);
        signup(user).then(data => {
             if(data.error) this.setState({error: data.error});
             else this.setState({
                 error: "",
                 name: "",
                 email: "",
                 password: "",
                 open: true
             });
          });
    };


  signupForm = (name, email, password) => (
    <div className="container h-100 bckg-signup">
        <div className="d-flex justify-content-center h-100">
        <div className="user_card">
        <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                    <img src="https://cdn.dribbble.com/users/2296468/screenshots/5637499/image.gif" className="brand_logo" alt="Logo" />
                </div>
        </div>
        <div className="d-flex justify-content-center form-container">
        <form>
            <div className="input-group mb-3">
                <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-user"></i> </span> 
                </div>
                <input onChange={this.handleChange("name")} type="text" className="form-control input_user" value = {name} placeholder="Name"/>
            </div>
            <div className="input-group mb-2">
                <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-envelope"></i> </span> 
                </div>
                <input onChange={this.handleChange("email")} type="email" className="form-control input_user" value = {email} placeholder="email" />
            </div>
            <div className="input-group mb-1">
                <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-key"></i> </span>
                </div>
                <input 
                    onChange={this.handleChange("password")} 
                    type="password" 
                    className="form-control input_pass" 
                    value = {password}
                    placeholder="password"
                />
            </div>
            <div className="d-flex justify-content-center mt-3 login_container">
                <button onClick={this.clickSubmit} className="btn login_btn" >Submit</button>
            </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    );

    render() {
        const {name, email, password, error, open} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div className="alert alert-danger" 
                    style={{display:error ? "" : "none"}}>
                    {error}
                </div>

                <div className="alert alert-info" 
                    style={{display: open ? "" : "none"}}>
                    New account is successfully created. Please{" "} 
                    <Link to="/signin">Sign In</Link>
                </div>

               {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;