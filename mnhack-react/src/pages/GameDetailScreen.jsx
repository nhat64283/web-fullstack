import React, { Component } from 'react';
const calculateSos = (scores) => {
    let sos = [0, 0, 0, 0];
    let total = 0;
  
    for (let i = 0; i < scores.length; i += 1) {
      for (let j = 0; j < scores[i].length; j += 1) {
        total += scores[i][j];
        sos[j] += scores[i][j];
      }
    }
  
    return {
      sos: sos,
      total: total,
    };
  };
//   const updateScore = (round, player, newScore) => {
//     fetch('/update-score', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         round: round,
//         player: player,
//         value: newScore,
//         gameId: gameInfo._id,
//       }),
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err);
//         window.alert(err.message);
//       });
//   };
  
class GameDetailScreen extends Component {
    state = {
        users: [{}],
        scores: [[{}]],
    };
    componentWillMount() {
        console.log("component will mount");
        const pathName = window.location.pathname.split('/');
        const gameId = pathName[pathName.length - 1];
        fetch(`http:localhost:3001/get-game-by-id?id=${gameId}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    users: data.data.users,
                    scores:data.data.scores,
                });
            })
            .catch((err) => {
                console.log(err);
                window.alert(err.message);
              });
    }
    // componentDidMount() {
    //     console.log('component did mount');
    // }
    render() {
        return (
            <div>
                Game Detail
                <div className='container mt-5'>
                    <table className="table">
                        <thead className='thead'></thead>
                        <tbody className='tbody'></tbody>
                    </table>
                    <button className='btn btn-primary add-round'>Add round</button>
                </div>
            </div>
        );
    }
}

export default GameDetailScreen;