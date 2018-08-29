import React from 'react'
import PropTypes from 'prop-types'
import '~/utils/polyfills'
import PageHead from '~/components/PageHead'
import Loader from '~/components/Loader'
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
    <Loader />
    <PageHead
      title={`Les Moffat | ${title}`}
    />
    {children}
    <style jsx>{styles}</style>
  </div>
)

PageWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  palette: PropTypes.shape({
    gradient: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
  title: PropTypes.string,
}

PageWrapper.defaultProps = {
  children: null,
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
    colors: [
      '#eee6ee',
      '#d9d9d9',
    ],
  },
  title: 'Les Moffat | Level 25 Dwarven Code Smith',
}

export default PageWrapper
