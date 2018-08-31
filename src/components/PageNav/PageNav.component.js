/* global window */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import ChevronLeftIcon from 'react-feather/dist/icons/chevron-left'
import styles from './PageNav.styles'

const PageNav = ({
  router,
  slides,
}) => (
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

PageNav.propTypes = {
  router: PropTypes.any,
  slides: PropTypes.array,
}

PageNav.defaultProps = {
  router: {},
  slides: {
    hello: {
      altText: 'Oops, something seems to have gone awry in here!',
    },
  },
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
                alt={`An icon for the ${slidename} page, ${altText}`}
              />
            </a>
          </Element>
          <style jsx>{styles}</style>
        </li>
      )
    })
}

export default PageNav