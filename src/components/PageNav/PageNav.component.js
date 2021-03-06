/* global window */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import MoreVerticalIcon from 'react-feather/dist/icons/more-vertical'
import TYPES from '~/constants/types'
import styles from './PageNav.styles'

const PageNav = ({
  router,
  slides,
}) => (
  <div className="PageNav">
    <span className="chevron">
      <MoreVerticalIcon
        strokeWidth="0.5px"
        size="3em"
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
  slides: PropTypes.objectOf(TYPES.SLIDE),
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
    .sort((
      [, { order: a }],
      [, { order: b }],
    ) => a - b)
    .map(([slidename, { altText, order }]) => {
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

      const liInternalElementProps = {
        ...(isActiveLink && { className: 'active-nav-option' }),
        ...(!isActiveLink && {
          href: `/CVSlide?slidename=${slidename}`,
          as: `/cv/${slidename}`,
        }),
      }

      return (
        <li
          className={navItemClassnames}
          key={order}
        >
          <Element {...liInternalElementProps}>
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
