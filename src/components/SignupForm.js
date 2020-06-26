import React from 'react'

export default class LoginForm extends React.Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    // FIXME: pwd doesn't do anything
    password: "",
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.newUserHandler(this.state)
  }

  render() {
    return (
      <form id="login-form" onSubmit={this.handleSubmit}>
        <label>
          Email
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          First Name
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
        </label>
        <label>
          Last Name
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
        </label>
        <label>
          Password 
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Sign Up"/>
      </form>
    )
  }
}