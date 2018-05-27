import React from 'react'
import PropTypes from 'proptypes'
import PageHead from '~/components/PageHead'
import styles from './PageWrapper.styles'

const PageWrapper = ({
  children,
}) => (
  <div className="PageWrapper">
    <PageHead
      title="Hiya!"
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
