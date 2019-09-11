import React, { Component } from 'react';

class login extends Component {
    state = {
        email: '',
        password: ''
    };
    handleemail = (useremail) => {
        this.setState({
            email: useremail,
        });
    };
    handleuserpassword = (userpassword) => {
        this.setState({
            password: userpassword,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    window.location.href = `/currentuser`;
                }
                else {
                    console.log(data);
                }

            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
    };
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control useremail"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={this.state.useremail}
                            onChange={(event) => { this.handleemail(event.target.value) }}
                        ></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control userpassword"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={this.state.userpassword}
                            onChange={(event) => { this.handleuserpassword(event.target.value) }}
                        />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary"
                        onClick={this.handleSubmit}
                    >login</button>
                    
                </form>
            </div>
        );
    }
}

export default login;