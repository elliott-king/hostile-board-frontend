import React from 'react'

export default class LoginForm extends React.Component {
  state = {
    email: "",
    // FIXME: pwd doesn't do anything
    password: "",
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.attemptLogin(this.state)
  }

  render() {
    return (
      <form id="login-form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input 
              type="email" 
              name="email" 
              value={this.state.email} 
              onChange={this.handleChange} 
              className="input"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input 
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="input"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input type="submit" className="button" value="Log In"/>
          </div>
        </div>
      </form>
    )
  }
}