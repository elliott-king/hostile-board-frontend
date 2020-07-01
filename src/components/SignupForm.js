import React from 'react'
import ReactDOM from 'react-dom'

import DropzoneComponent from 'react-dropzone-component'
import '../../node_modules/react-dropzone-component/styles/filepicker.css'
import '../../node_modules/dropzone/dist/min/dropzone.min.css'

export default class LoginForm extends React.Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    // FIXME: pwd doesn't do anything
    password: "",
    pdf: {},
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.newUserHandler(this.state)
  }

  render() {

    const dropzoneConfig = {
        iconFiletypes: ['.pdf'],
        showFiletypeIcon: true,
        postUrl: 'not using this'
    }
    const djsConfig = {
      acceptedFiles: "application/pdf",
      autoProcessQueue: false,
    }
    const dropzoneEventHandlers = {
      addedfile: (file) => this.setState({pdf: file}),
    }
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
        <DropzoneComponent 
          config={dropzoneConfig}
          eventHandlers={dropzoneEventHandlers}
          djsConfig={djsConfig}
        />
        <label>
          Password 
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Sign Up"/>
      </form>
    )
  }
}