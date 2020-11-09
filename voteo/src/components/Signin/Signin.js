import React from 'react';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInVI: '',
      signInPassword: ''
    }
  }
  onVotingidChange = (event) => {
    this.setState({signInVI: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }
  authenticate = () => {
    var input = document.getElementById('signinput');
    var pass = document.getElementById('signpass');
    if (input.value.length > 0 && pass.value.length > 0) {
      fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          vi: this.state.signInVI,
          password: this.state.signInPassword
        })
      })
        .then(res => res.json())
        .then(user => {
          if (user.sr_no) {
            this.props.loadUser(user);
            this.props.onRouteChange('InHome');
          }
          else {
            window.alert('Voting ID or Password is Incorrect!');
          }
        })
    }
  }
  render() {
    const {onRouteChange} = this.props;
    const enableSigninbtn = () => {
      var input = document.getElementById('signinput');
      var pass = document.getElementById('signpass');
      var sbtn = document.getElementById('signinbtn');
          if (input.value.length > 0 && pass.value.length > 0) {
            sbtn.classList.remove('white', 'bg-light-gray', 'hover-bg-light-gray', 'b--light-gray');
            sbtn.classList.add('orange', 'bg-white', 'hover-bg-orange', 'b--orange');
          }
          else {
            sbtn.classList.add('white', 'bg-light-gray', 'hover-bg-light-gray', 'b--light-gray');
            sbtn.classList.remove('orange', 'bg-white', 'hover-bg-orange', 'b--orange');
          }
      }
    return (
      <article className="br2 ba b--black-10 mv5 w-100 w-75-m w-25-l mw6 center shadow-2">
        <main>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4vh'}}>
              <h1 className='signinhead'>Sign&nbsp;In</h1>
              <input
                type='text'
                className='input'
                id = 'signinput'
                placeholder='Your Voting id'
                onChange = { (event) => {
                  enableSigninbtn()
                  this.onVotingidChange(event)
                } }
              />
              <input
                type='password'
                className='input'
                id = 'signpass'
                placeholder='Your Password'
                onChange = { (event) => {
                  enableSigninbtn()
                  this.onPasswordChange(event)
                } }
              />
              <br />
              <button id = 'signinbtn'
                      onClick = { this.authenticate }
                      className='dib link bw1 b--solid white bg-light-gray fw9 pa3 br-pill hover-white hover-bg-light-gray pointer w-60 ba b--light-gray'
                      type='submit'
                      value='Sign in'>
              Sign&nbsp;In
              </button>
              <br />
              OR
              <br /><br />
              <button
                onClick = { () => onRouteChange('Register') }
                className='dib link bw1 b--solid orange bg-white fw9 pa3 br-pill hover-white hover-bg-orange pointer w-60 ba b--orange'
                type = 'button'
                value = 'Register'>
              Register
              </button>
            </div>
          </main>
      </article>
    );
  }
}

export default Signin;
