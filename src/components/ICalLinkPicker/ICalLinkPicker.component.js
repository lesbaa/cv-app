/* global alert */
import React, { Component } from 'react'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import { compose } from 'ramda'
import styles from './ICalLinkPicker.styles'

class ICalLinkPicker extends Component {
  state = {
    url: null,
    datetime: null,
    hasError: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      datetime: value,
    }, this.buildUrl)
  }

  buildUrl = () => {
    const {
      datetime,
    } = this.state

    this.setState({
      url: `/calender?datetime=${datetime}`,
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

  getTomorrow = () => compose(
    datetime => format(datetime, 'YYYY-MM-DD'),
    datetime => addDays(datetime, 1),
  )(new Date())

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
