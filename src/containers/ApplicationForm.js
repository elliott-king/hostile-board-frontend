import React from 'react'
import Select from 'react-select'
import _ from 'lodash'

import skillsOptions from '../constants'

class ApplicationForm extends React.Component {

  // Sections: user data (name, etc), experience, cover letter
  constructor(props){
    super(props)
    this.skillsOptions = skillsOptions
    let resume = ""
    if (props.loggedInUser.resume) resume = JSON.parse(props.loggedInUser.resume)

    this.state = {
      section: "user_data",
      user_data: {
        first_name: props.loggedInUser.first_name ? props.loggedInUser.first_name : "",
        last_name: props.loggedInUser.last_name ? props.loggedInUser.last_name : "",
        email_address: props.loggedInUser.email ? props.loggedInUser.email : "",
        city: "",
      },
      experience: {
        skills: [],
        job_history: resume ? resume.experience.join('\n') : "",
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
            <React.Fragment key={key}>
              <label>
                {this.fromSnakeCase(key)}
                <input type="text" 
                  name={key} 
                  value={this.state.user_data[key]}
                  onChange={(event) => this.handleChange('user_data', event)}
                />
              </label>
              <br/>
            </React.Fragment>
          )
        })}
        <input type="submit" value="Next"/>
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
        <label>
          Skills
          <Select 
            isMulti 
            options={this.skillsOptions}
            defaultValue={this.state.experience.skills}
            value={this.state.experience.skills}
            onChange={this.handleSelectChange}
            menuPlacement="auto"
          />
        </label>
        <label>
          Job History
          <textarea 
            value={this.state.experience.job_history} 
            name="job_history"
            onChange={(event) => this.handleChange('experience', event)}
          />
        </label>
        <br/>
        <label>
          Projects
          <textarea 
            value={this.state.experience.projects} 
            name="projects"
            onChange={(event) => this.handleChange('experience', event)}
          />
        </label>
        <input type="submit" value="Next" />
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
        <label>
          Why are you interested in this job?
          <textarea 
            type="textinput" 
            value={this.state.written_introduction}
            name="written_introduction"
            onChange={(event) => this.setState({written_introduction: event.target.value})}
            />
        </label>
        <input type="submit" value="Submit"/>
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
      <div className="application-form-container" ref={this.formRef}>
        <p>This is the application form.</p>
        {this.renderSection()}
      </div>
    )
  }
}

export default ApplicationForm