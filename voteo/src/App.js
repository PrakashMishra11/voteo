import React from 'react';
import UserProfile from './components/UserProfile/UserProfile';
import VotingPage from './components/VotingPage/VotingPage';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Home from './components/Home/Home';
import { ausers } from './aadharUsers';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'Home',
      atHome: true,
      isSignedIn: false,
      weAreOnRegistration: false,
      weAreOnVotingPage: false,
      UsersFromApi: [],
      // voted party could be updated here
      user: {
        id: '',
        fn: '',
        ln: '',
        an: '',
        vi: '',
        hasVoted: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        name: ''
      }
    }
  }

  componentDidMount() {
    // this is our fake aadhaar api
    this.setState({ UsersFromApi: ausers });
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.sr_no,
      fn: data.name.split(" ")[0],
      ln: data.name.split(" ")[1],
      an: data.aadhaar_no,
      vi: data.voter_id,
      hasVoted: data.vote_status,
      city: data.city,
      state: data.state,
      phone: data.mobile,
      email: data.email,
      name: data.name
    }})
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if (route === 'InHome') {
      this.setState({atHome: true});
      this.setState({isSignedIn: true});
      this.setState({weAreOnRegistration: false});
      this.setState({weAreOnVotingPage: false});
    }
    if (route === 'OutHome') {
      this.setState({atHome: true});
      this.setState({isSignedIn: false});
      this.setState({weAreOnRegistration: false});
      this.setState({weAreOnVotingPage: false});
    }
    if (route === 'Signin') {
      this.setState({atHome: false});
      this.setState({isSignedIn: false});
      this.setState({weAreOnRegistration: false});
      this.setState({weAreOnVotingPage: false});
    }
    if (route === 'Register') {
      this.setState({atHome: false});
      this.setState({isSignedIn: false});
      this.setState({weAreOnRegistration: true});
      this.setState({weAreOnVotingPage: false});
    }
    if (route === 'UserProfile') {
      this.setState({atHome: false});
      this.setState({isSignedIn: true});
      this.setState({weAreOnRegistration: false});
      this.setState({weAreOnVotingPage: false});
    }
    if (route === 'VotingPage') {
      this.setState({atHome: false});
      this.setState({isSignedIn: true});
      this.setState({weAreOnRegistration: false});
      this.setState({weAreOnVotingPage: true});
    }
  }

  uponVoting = (party) => {
    fetch('http://localhost:3001/vote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        vi: this.state.user.vi,
        party: party
      })
    })
      .then(res => res.json())
      .then(status => {
        this.setState(Object.assign(this.state.user, { hasVoted: status }));
        if (this.state.user.hasVoted === true) {
          window.alert('ThankYou for Voting!');
          this.onRouteChange('VotingPage');
        }
      })
  }

  validateEntries = (adhar) => {
    let an = adhar.value;
    let foundUser = {};
    this.state.UsersFromApi.forEach(voter => {
      if (voter.an === an) {
        foundUser = voter;
      }
    });
    return foundUser;
  }

  render() {
    return (
      <div className="App">
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
          weAreOnRegistration={this.state.weAreOnRegistration}
          weAreOnVotingPage = { this.state.weAreOnVotingPage }
          atHome = { this.state.atHome }
        />
          { this.state.route === 'Signin'
            ? <Signin
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              />
            : ( this.state.route === 'Register'
              ? <Register
                  onRouteChange={this.onRouteChange}
                  validateEntries={this.validateEntries}
                />
              : ( this.state.route === 'VotingPage'
                ? <VotingPage
                    uponVoting={ this.uponVoting }
                    voteStatus = { this.state.user.hasVoted }
                    voter = { this.state.user.fn }
                  />
                : ( this.state.route === 'UserProfile'
                  ? <UserProfile userInfo = { this.state.user }/>
                  : <Home
                      onRouteChange={this.onRouteChange}
                    />
                  )
                )
              )
          }
      </div>
    );
  }
}

export default App;
