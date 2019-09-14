import React, { Component } from 'react';

class userScreen extends Component {
    state = {
        signin: false,
        email: "",
        // fullname: "",
    }
    componentWillMount() {
        fetch('http://localhost:3001/user/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    if(data.data) {
                        this.setState({
                            signin:true,
                            email: data.data.email,
                            
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });
    }
    render() {

        return (
            <div>
                welcome
            </div>
        );
    }
}

export default userScreen;