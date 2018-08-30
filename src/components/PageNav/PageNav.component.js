/* global window */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import ArrowRightIcon from 'react-feather/dist/icons/arrow-right'
import CodeIcon from 'react-feather/dist/icons/code'
import ShareIcon from 'react-feather/dist/icons/share-2'
import MailIcon from 'react-feather/dist/icons/mail'
import LinkedInIcon from 'react-feather/dist/icons/linkedin'
import copyToClipboard from '~/utils/clipboard'
import styles from './PageNav.styles'

const PageNav = ({
  router,
  slides,
}) => {
  // console.log(slides)
  return (
    <div className="PageNav">
      {mapSlides(slides)}
    </div>
  )
}

PageNav.propTypes = {

}

PageNav.defaultProps = {

}

function mapSlides (slides) {
  return Object.keys(slides)
    .map((slide) => (
      <Link
        href={{}}
      >
        <a>{slide}</a>
      </Link>
    ))
}

export default PageNav
