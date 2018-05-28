import React from 'react'
import PropTypes from 'proptypes'
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
}

export default PageWrapper
