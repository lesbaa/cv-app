import React from 'react'
import PropTypes from 'prop-types'
import TYPES from '~/constants/types'
import '~/utils/polyfills'
import PageHead from '~/components/PageHead'
import Loader from '~/components/Loader'
import PageNav from '~/components/PageNav'

import styles from './PageWrapper.styles'

const PageWrapper = ({
  children,
  palette,
  title,
  isMobile,
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
    { !isMobile && <PageNav /> }
    <style jsx>{styles}</style>
  </div>
)

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  isMobile: PropTypes.bool,
  palette: TYPES.PALETTE,
  title: PropTypes.string,
}

PageWrapper.defaultProps = {
  isMobile: false,
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
