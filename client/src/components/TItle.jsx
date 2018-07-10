import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';


const CrohnTitle = styled.div`
    display:${props => props.title ? 'flex': 'none'};
    flex-direction: column;
    margin: auto;
    padding: 2%;
    color: #F0FFFF;
    font-size:35px;
    box-shadow: 0 0 10px 10px #00FFFF;
    border-radius: 5px;
    white-space: nowrap;
`

const InlineBar = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
`

const Input = styled.input`
    font-family:HP simplified;
    width:100%;
    color: #F0FFFF;
    background-color:black;
    border-radius: 3px;
    display: inline-block;
`

const Font = styled.h1`
    font-size: 80px;
    background: -webkit-linear-gradient(#eee, #00FFFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

`

const StyledButton = styled.button`
    font-family:Tron;
    font-size:20px;
    border-color: #00FFFF;
    color: #00FFFF;
    background-color: black;
    margin-bottom: 5px;
    &:hover {
        background-color: #0AC0DC;
    }
    border-radius: 3px;
`

const Signedup = styled.p`
    font-size: 20px;
    ${props => !props.signup && css`display: none`}
`
const LoginFailed = styled.div`
    font-size: 20px;
    ${props => !props.failed && css`display: none`}  
`

const UsernameExists = styled.div`
    font-size: 20px;
    ${props => !props.userExists && css`display: none`}  
`

class Title extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            signup: false,
            userExists: false,
            failed: false
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }




    handleSignup() {
        this.setState({ 
            signup: false,
            failed: false,
            userExists:false
         })
        let data = {
            userName: this.state.name,
            password: this.state.password
        }
        if(data.userName && data.password) {
            fetch(`/users/${data.userName}`)
            .then(res => res.json())
            .catch(err => console.log(err))
            .then(res => {
                if (res && data.userName === res.userName) {
                    this.setState({ userExists:true })
                } else {
                    fetch('/newUser', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                            'Content-type': 'application/json'
                        }
                    }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response));
                    this.setState({ signup: true})
                }
            })
        }
    }

    handleLogin() {
        this.setState({ 
            signup: false,
            failed: false,
            userExists:false
         })
        let data = {
            userName: this.state.name,
            password: this.state.password
        }
        if(data.userName && data.password) {
            fetch(`/users/${data.userName}`)
            .then(res => res.json())
            .catch(err => console.log(err))
            .then(res => {
                console.log('this is res', res)
                if (res && data.userName === res.userName && data.password === res.password) {
                    this.props.login();
                } else {
                    this.setState({ failed: true })
                }
            })
        }
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    render() {
        return (
            <CrohnTitle title={this.props.title}>
                <Font>Crohn: Legacy</Font>
                    <InlineBar>
                        Username: 
                        <Input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
                    </InlineBar>
                    <InlineBar>
                        Password:
                        <Input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                    </InlineBar>
                <StyledButton onClick = {this.handleSignup}>Sign Up</StyledButton>
                <Signedup signup={this.state.signup}>Sign up Successful!</Signedup>
                <UsernameExists userExists={this.state.userExists}>Sorry, A User Has Taken That Name</UsernameExists>
                <LoginFailed failed={this.state.failed}>Sorry, Verification Failed</LoginFailed>
                <StyledButton onClick = {this.handleLogin}>Login</StyledButton>
            </CrohnTitle>
        )
    }
}

export default Title;