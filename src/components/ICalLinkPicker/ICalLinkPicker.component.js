/* global alert */
import React, { Component } from 'react'
import styles from './ICalLinkPicker.styles'

export const buildUrl = datetime => `/calender?datetime=${datetime}`

class ICalLinkPicker extends Component {
  state = {
    url: null,
    hasError: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      url: buildUrl(value),
    })
  }

  handleSubmit = (e) => {
    if (!this.state.url) {
      e.preventDefault()
      this.setState({
        hasError: true,
      })
      alert('Please enter a valid date / time')
    }
  }

  render = () => {
    const inputClassNames = [
      'input',
      this.state.hasError && 'error',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="ICalLinkPicker">
        <input
          className={inputClassNames}
          type="datetime-local"
          id="datetime"
          name="trip"
          onChange={this.handleChange}
        />
        <a
          className="submit"
          href={this.state.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={this.handleSubmit}
        >
          Remind me!
        </a>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default ICalLinkPicker
