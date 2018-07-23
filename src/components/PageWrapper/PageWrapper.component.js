import React from 'react'
import PropTypes from 'proptypes'
import '~/utils/polyfills'
import PageHead from '~/components/PageHead'
import styles from './PageWrapper.styles'

const PageWrapper = ({
  children,
  palette,
  title,
}) => (
  <div
    className="PageWrapper"
  >
    <div
      className="gradient"
      style={{ background: `linear-gradient(${palette.gradient})` }}
    />
    <PageHead
      title={`Les Moffat | ${title}`}
    />
    {children}
    <style jsx>{styles}</style>
  </div>
)

PageWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

PageWrapper.defaultProps = {
  children: null,
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
  }
}

// TODO proptypes in here

export default PageWrapper
