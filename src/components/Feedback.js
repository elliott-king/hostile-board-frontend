import React, {useState} from 'react'

const Feedback = (props) => {
  let [content, updateContent] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    props.submit(content)
  }

  return (
    <div id="feedback-invisible-div" className="feedback-invisible-div">
      <div id="feedback-container" className="feedback-centered">
        <form id="feedback-form" onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea has-fixed-size is-danger"
                name="content"
                value={content}
                onChange={e => updateContent(e.target.value)}
                placeholder={"We always appreciate feedback."}
              />
            </div>
          </div>
          <input type="submit" className="button" value="Submit Feedback" />
        </form>
      </div>
    </div>
  )
}

export default Feedback