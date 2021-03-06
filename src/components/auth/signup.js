import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { signUp } from '../../actions/authAction';


class Signup extends Component {
    state = {
        email: '',
        password: '',
        fname: '',
        lname: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
  render() {
    const {auth, authError} = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="lname">Last name</label>
                <input type="text" id="lname" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <button className="btn green z-depth-0 lighten-1">Sign up</button>
                <div className="red-text center">
                    { authError ? <p>{authError}</p> : null }
                </div>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)