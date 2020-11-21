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
      foundUser: {},
      otpDidVerify: false
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
  onRegSubmit = async () => {
    this.setUpRecaptcha();
    var phoneNumber = "+91" + this.userPhone;
    var appVerifier = window.recaptchaVerifier;
    // appVerifier.render().then(function(widgetId) {
    //   window.recaptchaWidgetId = widgetId;
    // });
    // var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
    let status = false;
    await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(async function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          var code = window.prompt('Enter OTP sent to the mobile number registered with your aadhar card');
          await confirmationResult.confirm(code)
            .then(function (result) {
              // User signed in successfully.
              var user = result.user;
              console.log(user);
              // ...
              // console.log('User should be signed in');
              // this.user = user;
              status = true;
          }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
            window.alert('Invalid OTP');
          });
        }).catch(function (error) {
          // Error; SMS not sent
          // ...

          // find out whether or not user with same voting id exitsts in the application database
          // if it exists alert this aadhar number is already registered
          // if not, delete the user from the google-firebase authentication section
          // and then alert the message to try again.
          // window.alert('OTP not sent');

          // appVerifier.render().then(function(widgetId) {
          //   grecaptcha.reset(widgetId);
          // });

          window.alert('OTP not sent');
        });
        return await status;
  }
  authenticate = () => {
    let adhar = document.getElementById('adhar');
    let votn = document.getElementById('votn');
    let pass = document.getElementById('pass');
    let cpass = document.getElementById('cpass');
    if (this.state.otpDidVerify && adhar.value.length > 0 && votn.value.length > 0 && pass.value.length > 0 && cpass.value.length > 0) {
        this.vid = votn;
        if (pass.value === cpass.value) {
            fetch('http://localhost:3001/register', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                an: this.state.an,
                vi: this.state.vi,
                password: this.state.password,
                fn: this.state.foundUser.fn,
                ln: this.state.foundUser.ln,
                phone: this.state.foundUser.phone,
                email: this.state.foundUser.email,
                city: this.state.foundUser.city,
                state: this.state.foundUser.state
              })
            })
            .then(res => res.json())
            .then(data => {
              if (data === 'success') {
                this.setState({otpDidVerify: false});
                this.props.onRouteChange('Signin');
              }
            })
        }
        else {
          window.alert('Passwords do not match!');
        }
    }
    if (!this.state.otpDidVerify && adhar.value.length > 0 && votn.value.length > 0 && pass.value.length > 0 && cpass.value.length > 0) {
      window.alert('Please verify Aadhar Number first!');
    }
  }

  sendOtp = () => {
    let adhar = document.getElementById('adhar');
    let vbtn = document.getElementById('vbtn');
    if (adhar.value.length <= 0) {
      window.alert('Please Enter Your Aadhar Number!');
    }
    else {
      let foundUser = this.props.validateEntries(adhar);
      if (!foundUser.an) {
        window.alert('Aadhar Number is invalid!');
      }
      else {
        this.setState({foundUser: foundUser}, async () => {
            this.userPhone = foundUser.phone;
            let otpStatus = await this.onRegSubmit();
            if (otpStatus) {
              this.setState({otpDidVerify: true});
              vbtn.classList.remove('bg-gray', 'hover-bg-mid-gray', 'pointer', 'link');
              vbtn.classList.add('bg-light-green');
              vbtn.innerHTML = "✔";
              adhar.disabled = true;
            }
            else {
              this.setState({otpDidVerify: false});
            }
          });
      }
    }
  }

  render() {
    const enableRegbtn = () => {
      let adhar = document.getElementById('adhar');
      let votn = document.getElementById('votn');
      let pass = document.getElementById('pass');
      let cpass = document.getElementById('cpass');
      let rbtn = document.getElementById('rbtn');
      // document.getElementById('vbtn').classList.contains('bg-light-green');
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

              <br />
              <button id = 'vbtn'
                      className='white b pv2 ph3 link bg-gray hover-bg-mid-gray bn br-pill pointer'
                      onClick = { this.sendOtp }
                      type = 'button'
                      value = 'Register'>
              Send&nbsp;OTP
              </button>
              <br />
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
