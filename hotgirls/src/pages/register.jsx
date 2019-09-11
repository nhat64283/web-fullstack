import React, { Component } from 'react';

class register extends Component {
    state = {
        email: '',
        password: '',
        cfpassword: '',
        fullname: '',
        fail_message: "",
        loading: false,
    };
    handleemail = (event) => {
        this.setState({
            email: event.target.value,
            fail_message: "",
        });
    };
    handleuserpassword = (event) => {
        this.setState({
            password: event.target.value,
            fail_message: "",
        });
    };
    handlecfuserpassword = (event) => {
        this.setState({
            cfpassword: event.target.value,
            fail_message: "",
        });
    };
    handlefullname = (event) => {
        this.setState({
            fullname: event.target.value,
            fail_message: "",
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.email || !this.state.fullname || !this.state.password || !this.state.cfpassword) {
            this.setState({
                fail_message: "Please fill it all"
            });
            return;
        }
        if (this.state.password !== this.state.cfpassword) {
            this.setState({
                fail_message: "Password and Confirm password didn't match."
            });
            return;
        }
        // this.setState({
        //     loading:true,
        // });
        fetch(`http://localhost:3001/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                cfpassword: this.state.cfpassword,
                fullname: this.state.fullname,
            }),
        })
            .then((res) => {
                return res.json();

            })
            .then((data) => {
                if (data.success) {
                    window.location.href = `/login`;
                }
                else {
                    console.log(data.message);
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
                            onChange={this.handleemail}
                        ></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control userpassword"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={this.state.userpassword}
                            onChange={this.handleuserpassword}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Confirm Password</label>
                        <input type="password" className="form-control cfuserpassword"
                            id="exampleInputPassword1"
                            placeholder="Confirm Password"
                            value={this.state.cfuserpassword}
                            onChange={this.handlecfuserpassword}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Fullname</label>
                        <input type="text" className="form-control userfullname"
                            id="exampleInputPassword1"
                            placeholder="Fullname"
                            value={this.state.userfullname}
                            onChange={this.handlefullname}
                        />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    {(!this.state.fail_message) ? <div></div> : <div className="alert alert-danger">{this.state.fail_message}</div>}
                    <button type="submit" className="btn btn-primary"
                        onClick={this.handleSubmit}
                    >Register</button>
                        {/* {(!this.state.loading) ? <div></div> :<div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>} */}
                    

                </form>
            </div>
        );
    }
}

export default register;