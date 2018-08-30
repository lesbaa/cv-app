/* global window */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import ChevronLeftIcon from 'react-feather/dist/icons/chevron-left'
import styles from './PageNav.styles'

const PageNav = ({
  router,
  slides,
}) => {
  console.log(slides)
  return (
    <div className="PageNav">
      <span className="chevron">
        <ChevronLeftIcon
          strokeWidth="1px"
          size="2em"
        />
      </span>
      <ul className="nav-links">
        {mapSlides(slides, router)}
      </ul>
      <style jsx>{styles}</style>
    </div>
  )
}

PageNav.propTypes = {

}

PageNav.defaultProps = {

}

function mapSlides(slides, router) {
  return Object.entries(slides)
    .map(([slidename, { altText }]) => {
      const isActiveLink = router.query.slidename === slidename
      const navItemClassnames = [
        'nav-item',
        isActiveLink && 'active',
      ]
        .filter(Boolean)
        .join(' ')

      const Element = isActiveLink
        ? props => <span {...props} />
        : Link

      return (
        <li className={navItemClassnames}>
          <Element
            href={`/CVSlide?slidename=${slidename}`}
            as={`/cv/${slidename}`}
          >
            <a title={altText}>
              <img
                src={`/static/img/nav-icons/${slidename}.svg`}
                alt={`An icon for the ${slidename} page`}
              />
            </a>
          </Element>
          <style jsx>{styles}</style>
        </li>
      )
    })
}

export default PageNav
