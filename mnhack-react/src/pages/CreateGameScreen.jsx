import React, { Component } from 'react';

class CreateGameScreen extends Component {
    state = {
        player1:'',
        player2:'',
        player3:'',
        player4:'',
    };
    handlePlayNamechange = (playNumber,value) => {
        const player =`player${playNumber}`;
        this.setState({
            [player]: value,
        });
    };
    handleFormSubmit = (event) => {
      event.preventDefault();
      const player1 = this.state.player1;
      const player2 = this.state.player2;
      const player3 = this.state.player3;
      const player4 = this.state.player4;
      
    if (!player1 || !player2 || !player3 || !player4) {
        // document.querySelector('.error').insertAdjacentHTML('beforeend', `
        //   <div class="alert alert-danger" role="alert">
        //     Please input player name !!
        //   </div>
        // `);
        console.log(player1,player2,player3,player4);
      } else {
        // document.querySelector('.error').innerHTML = '';
  
        // fetch to server
        fetch(`http://localhost:3001/create-game`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            users: [player1, player2, player3, player4],
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            window.location.href = `/games/${data.data._id}`;
          })
          .catch((err) => {
            console.log(err);
            window.alert(err.message);
          });
      }

    };
    render() {
        return (
            <div>
                <div className="container mt-5" onSubmit={this.handleFormSubmit}>
      <h2>Score keeper</h2>

			<form className='mt-4 create-game-form'>
				<div className="form-group">
					<input
						type="text"
						className="form-control player1"
                        placeholder="Enter player name"
                        value={this.state.player1}
                        onChange={(event) => {this.handlePlayNamechange(1,event.target.value)}}
					/>
        </div>
        
        <div className="form-group">
          <input
            type="text"
            className="form-control player2"
            placeholder="Enter player name"
            value={this.state.player2}
            onChange={(event) => {this.handlePlayNamechange(2,event.target.value)}}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control player3"
            placeholder="Enter player name"
            value={this.state.player3}
            onChange={(event) => {this.handlePlayNamechange(3,event.target.value)}}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control player4"
            placeholder="Enter player name"
            value={this.state.player4}
            onChange={(event) => {this.handlePlayNamechange(4,event.target.value)}}
          />
        </div>

        <div className='error'></div>

        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary submit"
            value='Create Game'
            
          />
        </div>
			</form>
		</div>

            </div>
        );
    }
}

export default CreateGameScreen;