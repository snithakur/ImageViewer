import React, {Component} from 'react';
import Header from '../../common/header/Header';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Login.css'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {withRouter} from 'react-router-dom';
class Login extends Component{

     


    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            incorrectUsernamePassword: "dispNone"
        }
    }


    loginHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
    
        if (this.state.username === "" || this.state.password === "") { return }

        if (this.state.username === "admin" && this.state.password==="root"){
            sessionStorage.setItem('username','admin');
            sessionStorage.setItem('access-token','8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
            this.setState({ loggedIn: true });
            this.props.history.push('/home');   
        }
        else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
     }
     
    UsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    PasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    render(){

        return(
            <div className="bookShow">
                <Header/>
                
                <Card className="cardStyle">
                        <CardContent>
                    
                            <FormControl required>
                                <InputLabel htmlFor="username">Username </InputLabel>
                                <Input id="username" type="text"  username={this.state.username} onChange={this.UsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password </InputLabel>
                                <Input id="password" type="password" loginpassword={this.state.password} onChange={this.PasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <div className={this.state.incorrectUsernamePassword}>
                            <span className="red"> 
                            Incorrect username and/or password 
                            </span>
                            </div><br />

                            <Button variant ="contained" color="primary" onClick={this.loginHandler}>LOGIN</Button>
                            <br /><br />
                            </CardContent>
                </Card>
            </div>
        );

    }
}
export default Login;