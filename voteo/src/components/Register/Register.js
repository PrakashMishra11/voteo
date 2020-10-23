import React from 'react';
import firebase from '../../firebase';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      an: '',
      vi: '',
      password: '',
      foundUser: {}
    }
  }
  userPhone = '';
  vid = '';
  onAadharChange = (event) => {
    this.setState({an: event.target.value});
  }
  onVotingidChange = (event) => {
    this.setState({vi: event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  }
  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onRegSubmit();
      }
    });
  }
  onRegSubmit = () => {
    this.setUpRecaptcha();
    var phoneNumber = "+919340153654";  //"+91" + this.userPhone;
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          var code = window.prompt('Enter OTP sent to the mobile number registered with your aadhar card');
          confirmationResult.confirm(code).then(function (result) {
            // User signed in successfully.
            var user = result.user;
            console.log(user);
            // ...
            console.log('User should be signed in');
            return true;
          }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
            window.alert(error);
            return false;
          });
        }).catch(function (error) {
          // Error; SMS not sent
          // ...
          
          // find out whether or not user with same voting id exitsts in the application database
          // if it exists alert this aadhar number is already registered
          // if not, delete the user from the google-firebase authentication section
          // and then alert the message to try again.
          window.alert(error);
          return false;
        });
  }
  authenticate = () => {
    let adhar = document.getElementById('adhar');
    let foundUser = this.props.validateEntries(adhar);
    let votn = document.getElementById('votn');
    let pass = document.getElementById('pass');
    let cpass = document.getElementById('cpass');
    if (adhar.value.length > 0 && votn.value.length > 0 && pass.value.length > 0 && cpass.value.length > 0) {
      this.setState({foundUser: foundUser}, () => {
          this.userPhone = foundUser.phone;
          this.vid = votn;
          let otpStatus = this.onRegSubmit();
          if (foundUser.an && otpStatus && pass.value === cpass.value) {
              fetch('http://localhost:3001/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  an: this.state.an,
                  vi: this.state.vi,
                  password: this.state.password,
                  fn: foundUser.fn,
                  ln: foundUser.ln,
                  phone: foundUser.phone,
                  email: foundUser.email,
                  city: foundUser.city,
                  state: foundUser.state
                })
              })
              .then(res => res.json())
              .then(data => {
                if (data === 'success') {
                  this.props.onRouteChange('Signin');
                }
              })
          }
          else {
            if (!foundUser.an) {
              window.alert('Aadhar Number is invalid!');
            }
            else {
              window.alert('Passwords do not match!');
            }
          }
      });
    }
  }

  render() {
    const enableRegbtn = () => {
      let adhar = document.getElementById('adhar');
      let votn = document.getElementById('votn');
      let pass = document.getElementById('pass');
      let cpass = document.getElementById('cpass');
      let rbtn = document.getElementById('rbtn');
          if (adhar.value.length > 0 && votn.value.length > 0 && pass.value.length > 0 && cpass.value.length > 0) {
            rbtn.classList.remove('white', 'bg-light-gray', 'hover-bg-light-gray', 'b--light-gray');
            rbtn.classList.add('orange', 'bg-white', 'hover-bg-orange', 'b--orange');
          }
          else {
            rbtn.classList.add('white', 'bg-light-gray', 'hover-bg-light-gray', 'b--light-gray');
            rbtn.classList.remove('orange', 'bg-white', 'hover-bg-orange', 'b--orange');
          }
      }
    return (
      <article className="br2 ba b--black-10 mv2 w-100 w-75-m w-25-l mw6 center shadow-2">
        <main>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4vh'}}>
              <h1 className='registerhead'>Registration</h1>
              <input
                type='text'
                className='input'
                id='adhar'
                placeholder='Your Aadhar Number'
                onChange={ (event) => {
                  enableRegbtn()
                  this.onAadharChange(event)
                }}
              />
              <div id='recaptcha-container'></div>

              <input
                type='text'
                className='input'
                id='votn'
                placeholder='Your Voting Id'
                onChange={ (event) => {
                  enableRegbtn()
                  this.onVotingidChange(event)
                }}
              />
              <input
                type='password'
                className='input'
                id='pass'
                placeholder='Your Password'
                onChange={ (event) => {
                  enableRegbtn()
                  this.onPasswordChange(event)
                }}
              />
              <input
                type='password'
                className='input'
                id='cpass'
                placeholder='Confirm Password'
                onChange={ enableRegbtn }
              />

              <br /><br />
              <button id = 'rbtn'
                      className='dib link bw1 b--solid white bg-light-gray fw9 pa3 br-pill hover-white hover-bg-light-gray pointer w-60 ba b--light-gray'
                      onClick = { this.authenticate }
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

export default Register;
