import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';
import '../style/bckgStyle.css';
import '../style/loginStyle.css';

class Signin extends Component{
    constructor() {
        super()
        this.state = {
             email: "",
             password: "",
             error: "",
             redirectToReferer: false,
             loading: false
           
        };
    }
 
     handleChange = name => event => {
         this.setState({error: ""}); //quitar el alert cuando se empieze a escribir
         this.setState({ [name]: event.target.value});
     };
 
     clickSubmit = event => {
         event.preventDefault();
         this.setState({loading: true})
         const {email, password} = this.state;
         const user = {
             email,
             password
         };
         console.log(user);
        signin(user).then(data => {
              if(data.error) {
                this.setState({error: data.error, loading:false})
              }
              else{
                  //authenticate
                  authenticate(data, () => {
                      this.setState({redirectToReferer: true})
                  });
              }
           });
     };
 

   signinForm = ( email, password) => (
<div className="container h-100 bckg-signin">
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
                            <span className="input-group-text"><i className="fas fa-envelope"></i> </span>    
                        </div>
                        <input onChange={this.handleChange("email")} type="email" className="form-control input_user" value = {email} placeholder=" email"/>
                    </div>
                    <div className="input-group mb-2">
                        <div className="input-group-append">
                            <span className="input-group-text"><i className="fas fa-key"></i> </span>
                        </div>
                        <input onChange={this.handleChange("password")} type="password" className="form-control input_pass" value = { password} placeholder= " password"/>
                    </div>
                </form>
            </div>
            <div className="d-flex justify-content-center mt-3 login_container">
                   {/*  <button type="button" name="button" className="btn login_btn">Login</button> */}
                    <button onClick={this.clickSubmit} type="button" className="btn login_btn">Submit</button>
            </div>
        </div>
    </div>
</div>
     );
 
     render() {
         const {email, password, error, redirectToReferer, loading} = this.state;
         if(redirectToReferer){
             return <Redirect  to="/" />
         }
         return (
             <div className="container">
                 <h2 className="mt-5 mb-5">Sign In</h2>
 
                 <div className="alert alert-danger" 
                     style={{display:error ? "" : "none"}}>
                     {error}
                 </div>

                 { loading ? (
                     <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                 ) : (
                    ""
                 )}
 
                {this.signinForm(email, password)}
                <p>
            <Link to="/forgot-password" className="d-flex justify-content-center links">
                {" "}
                Forgot Password
            </Link>
            </p>
             </div>
         );
     }
 }


export default Signin;