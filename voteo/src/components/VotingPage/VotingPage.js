import React from 'react';
import Card from './Card';
import './VotingPage.css';

class VotingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partiesAvailable: []
    }
  }
  getParties = () => {
    fetch('http://localhost:3001/getPartyInfo')
        .then(res => res.json())
        .then(data => {
          // this.setState({ partiesAvailable: [{"Loading" : "Loading"}] })
          if (data !== "There are no political parties available!") {
            this.setState({ partiesAvailable: data });
          }
          else {
            this.setState({ partiesAvailable: [{"Loading" : "Loading"}] })
          }
        })
  }
  render() {
    if (this.props.voteStatus) {
      return (
        <div className='tc dib votingBackground' style={{height: '100vh', display: 'inline-block'}}>
          <h1 style={{fonFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif', marginTop: '22vh'}}>{ `${ this.props.voter }, your vote has been already recorded!` }</h1>
          <h1 style={{fonFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif'}}>NOTE: Votes cannot be revoked!</h1>
        </div>
      );
    }
    else {
      this.getParties();
      return (
            <main className='tc dib votingBackground'>
              {
                this.state.partiesAvailable.map((party, i) => {
                  if (this.state.partiesAvailable[i].Loading === "Loading") {
                    return (
                      <div className='w-90 tc dib' style={{height: '100vh', display: 'inline-block'}}>
                        <h1 style={{fonFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif', marginTop: '22vh'}}>LOADING...</h1>
                      </div>
                    );
                  }
                  else {
                    return (
                      <Card
                         key={ i }
                         party={ this.state.partiesAvailable[i].party_name.toLowerCase() }
                         candidate={ this.state.partiesAvailable[i].candidate }
                         uponVoting={ this.props.uponVoting }
                       />
                     );
                  }
                })
              }
            </main>
      );
    }
  }
}

export default VotingPage;
