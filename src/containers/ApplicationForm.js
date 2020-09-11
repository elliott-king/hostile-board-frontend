import React from 'react'
import Select from 'react-select'
import _ from 'lodash'

import {skillsOptions, clippyMessages} from '../utils/constants'

class ApplicationForm extends React.Component {

  // Sections: user data (name, etc), experience, cover letter
  constructor(props){
    super(props)
    this.skillsOptions = skillsOptions
    let resume = ""
    if (props.loggedInUser.resume_text) resume = JSON.parse(props.loggedInUser.resume_text)

    this.state = {
      section: "user_data",
      user_data: {
        first_name: props.loggedInUser.first_name ? this.insertSmallTypos(props.loggedInUser.first_name) : "",
        last_name: props.loggedInUser.last_name ? this.insertSmallTypos(props.loggedInUser.last_name) : "",
        email_address: props.loggedInUser.email ? this.insertSmallTypos(props.loggedInUser.email) : "",
        city: "",
      },
      experience: {
        skills: [],
        job_history: resume ? this.insertSmallTypos(resume.experience.join('\n')) : "",
        projects: '',
      },
      written_introduction: "",
    }

    if (resume.skills) {
      let skills = resume.skills.map(elem => ({
        value: elem,
        label: this.fromSnakeCase(elem)
      }))
      this.state.experience.skills = skills
      this.skillsOptions = _.union(skillsOptions, skills)
    }
    this.formRef = React.createRef()
  }

  componentDidMount() {
    this.formRef.current.scrollIntoView()
  }

  insertSmallTypos = (string) => {
    const typoAt = (string, i) => {
      const randVal = Math.floor(Math.random() * 32)
      let randChar = ""
      if (randVal < 26) randChar = String.fromCharCode(97 + randVal)
      return string.substr(0, i) + randChar + string.substring(i + 1)
    }
    let i = 0
    while (i < string.length) {
      const pctChanceToChange = 0.01
      const isChanged = Math.random() < pctChanceToChange
      if (isChanged && string[i] !== ' ' && string[i] !== '\n') string = typoAt(string, i)
      i += 1
    }
    return string
  }

  fromSnakeCase = (snake) => {
    let words = snake.split("_")
    words = words.map(w =>  w[0].toUpperCase() + w.slice(1))
    return words.join(' ')
  }

  renderUserDataSection = () => {
    return (
      <form
        className="application-form-section"
        id="application-user-data"
        onSubmit={this.handleSectionSubmit}
      >
        {Object.keys(this.state.user_data).map(key => {
          return (
            <div className="field" key={`user-data-field-${key}`}>
              <label className="label">{this.fromSnakeCase(key)}</label>
              <div className="control">
                <input type="text" 
                  name={key} 
                  value={this.state.user_data[key]}
                  onChange={(event) => this.handleChange('user_data', event)}
                />
              </div>
            </div>
          )
        })}
        <input className="button is-success" type="submit" value="Next"/>
        <button className="button is-danger" onClick={this.props.cancelApply}>Cancel</button>
      </form>
    )
  }

  renderExperienceSection = () => {

    return (
      <form
        className="application-form-section"
        id="application-user-data"
        onSubmit={this.handleSectionSubmit}
      >
      <div className="field">
        <label className="label">Skills</label>
        <Select 
          isMulti 
          options={this.skillsOptions}
          defaultValue={this.state.experience.skills}
          value={this.state.experience.skills}
          onChange={this.handleSelectChange}
          menuPlacement="auto"
        />
      </div>
      <div className="field">
        <label className="label">Job History</label>
        <div className="control">
          <textarea 
            className="textarea"
            rows={10}
            spellCheck={false}
            value={this.state.experience.job_history} 
            name="job_history"
            onChange={(event) => this.handleChange('experience', event)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Other Projects</label>
        <div className="control">
          <textarea 
            className="textarea "
            value={this.state.experience.projects} 
            name="projects"
            onChange={(event) => this.handleChange('experience', event)}
          />
        </div>
      </div>
        <input className="button is-success" type="submit" value="Next" />
        <button className="button is-danger" onClick={this.props.cancelApply}>Cancel</button>
      </form>
    )
  }

  renderWrittenIntroductionSection = () => {
    return (
      <form 
        className="application-form-section"
        id="application-user-data"
        onSubmit={this.handleSectionSubmit}
      >
        <div className="field">
          <label className="label">Why are you interested in this job?</label>
          <div className="control">
          <textarea 
            className="textarea"
            type="textinput" 
            value={this.state.written_introduction}
            name="written_introduction"
            onChange={(event) => this.setState({written_introduction: event.target.value})}
            />
          </div>
        </div>
        <input className="button is-warning" type="submit" value="Submit"/>
        <button className="button is-danger" onClick={this.props.cancelApply}>Cancel</button>
      </form>
    )
  }

  handleSelectChange = (selectedOptions) => {
    this.setState(prev => {
      return {
        experience: {
          ...prev.experience,
          skills: selectedOptions
        }
      }
    })
  }

  handleChange = (section, event) => {
    event.persist()
    this.setState(prev => {
      return {
        [section]: {
          ...prev[section],
          [event.target.name]: event.target.value
        }
      }
    })
  }

  handleSectionSubmit = (event) => {
    event.persist()
    event.preventDefault()
    if (this.state.section === "user_data") this.setState({section: "experience"})
    switch(this.state.section) {
      case "user_data":
        this.setState({section: "experience"})
        break
      case "experience":
        this.setState({section: "written_introduction"})
        break
      case "written_introduction":
        this.setState({section: "user_data"})
        this.submitApplicationForm()
        break
      default:
        console.error("reached default case!")
    }
  }

  renderSection = () => {
    if (this.state.section === "user_data") return this.renderUserDataSection()
    if (this.state.section === "experience") return this.renderExperienceSection()
    if (this.state.section === "written_introduction") return this.renderWrittenIntroductionSection()
  }

  clippyUrl = () => {
    // I used ezgif.com to edit these gifs.
    if (this.state.section === "user_data") return "/clippy_scratchhead.gif"
    if (this.state.section === "experience") return "/clippy_eyebrows_2.gif"
    if (this.state.section === "written_introduction") return "/clippy_noloop_2.gif"
  }

  submitApplicationForm = () => {
    let application = {
      user_id: this.props.loggedInUser.id,
      position_id: this.props.positionId,
      skills: this.state.experience.skills.map(skill => skill.value),
      job_history: this.state.experience.job_history,
      projects: this.state.experience.projects,
      written_introduction: this.state.written_introduction,
    }
    this.props.submitApplication(application)
  }

  render() {
    return (
      <React.Fragment>
        <div className="application-form-container" ref={this.formRef}>
          {this.renderSection()}
        </div>
        <img src={this.clippyUrl()} alt="clippy" id="clippy"/>
        <div className="box" id="clippy-box">{clippyMessages[this.state.section]}</div>
      </React.Fragment>
    )
  }
}

export default ApplicationForm