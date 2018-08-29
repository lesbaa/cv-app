import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '~/components/PageWrapper'
import Title from '~/components/Title'
import Main from '~/components/Main'
import Nav from '~/components/Nav'

class Error extends React.Component {
  static pageTransitionDelayEnter = false

  static getInitialProps({ res, err }) {
    if (res && res.statusCode) return { statusCode: res.statusCode }

    if (err && err.statusCode) {
      console.error(err)
      return { statusCode: err.statusCode }
    }
    return { statusCode: 500 }
  }

  componentDidMount = () => {
    this.props.pageTransitionReadyToEnter()
  }

  render() {
    return (
      <PageWrapper
        title="Oops!"
      >
        <div className="error-wrapper">
          <Title title={`Error ${this.props.statusCode}`} />
          <Main>
            {getErrorMessage(this.props.statusCode)}

          </Main>
          <Nav
            nextSlide={false}
            previousSlide="hello"
          />
        </div>
        <style jsx>{`
          .error-wrapper {
            margin: 20% 30%;
          }
        `}</style>
      </PageWrapper>
    )
  }
}

Error.defaultProps = {
  pageTransitionReadyToEnter: () => {},
  statusCode: PropTypes.number,
}

Error.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func,
  statusCode: 500,
}

export default Error

function getErrorMessage(code) {
  switch (code) {
    case 404: {
      return (
        <p>
          Hmmm, what you&apos;re looking for doesn&apos;t seem to be here.
        </p>
      )
    }
    default: {
      return (
        <p>
          Ooops! Something seems to have gone awry here!
        </p>
      )
    }
  }
}
