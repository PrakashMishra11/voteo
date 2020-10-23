import React from 'react';
import Navigation from './components/Navigation/Navigation';
import UserProfile from './components/UserProfile/UserProfile';
import VotingPage from './components/VotingPage/VotingPage';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import { ausers } from './aadharUsers';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'Signin',
      isSignedIn: false,
      weAreOnRegistration: false,
      votingStart: false,
      UsersFromApi: [],
      // voted party could be updated here
      user: {
        id: '',
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
    if (route === 'Signin') {
      this.setState({isSignedIn: false});
      this.setState({weAreOnRegistration: false});
      this.setState({votingStart: false});
    }
    if (route === 'Register') {
      this.setState({isSignedIn: false});
      this.setState({weAreOnRegistration: true});
      this.setState({votingStart: false});
    }
    if (route === 'UserProfile') {
      this.setState({isSignedIn: true});
      this.setState({weAreOnRegistration: false});
      this.setState({votingStart: false});
    }
    if (route === 'VotingPage') {
      this.setState({isSignedIn: true});
      this.setState({weAreOnRegistration: false});
      this.setState({votingStart: true});
    }
  }

  uponVoting = () => {
    fetch('http://localhost:3001/vote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        vi: this.state.user.vi
      })
    })
      .then(res => res.json())
      .then(status => {
        this.setState(Object.assign(this.state.user, { hasVoted: status }));
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
                  />
                : <div>
                    <UserProfile />
                  </div>
                )
              )
          }
      </div>
    );
  }
}

export default App;
