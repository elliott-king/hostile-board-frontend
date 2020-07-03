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
      <form id="signup-form" onSubmit={this.handleSubmit}>
        <div className="field">
          <div className="control has-icons-left">
            <input 
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="input"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field is-grouped">
          {/* <label className="label">Name</label> */}
          <div className="control">
            <input 
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
              className="input"
              placeholder="First Name"
            />
          </div>
          <div className="control">
            <input 
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
              className="input"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Upload your resume</label>
          <DropzoneComponent 
            config={dropzoneConfig}
            eventHandlers={dropzoneEventHandlers}
            djsConfig={djsConfig}
          />
        </div>
        <div className="field">
          <div className="control has-icons-left">
            <input 
              type="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleChange}
              className="input"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input type="submit" className="button" value="Sign Up"/>
          </div>
        </div>
      </form>
    )
  }
}