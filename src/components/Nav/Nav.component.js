import React from 'react'
import Link from 'next/link'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import ArrowRightIcon from 'react-feather/dist/icons/arrow-right'
import InfoIcon from 'react-feather/dist/icons/info'
import ShareIcon from 'react-feather/dist/icons/share-2'
import MailIcon from 'react-feather/dist/icons/mail'
import styles from './Nav.styles'

const Nav = ({
  previousSlide,
  nextSlide,
}) => {
  const mailIconClassName = [
    'nav-item',
    !nextSlide && 'tadaa-anim',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav
      className="Nav"
    >
      <div
        className="actions"
      >
        <span className="nav-item"><InfoIcon size="1em" /></span>
        <span className="nav-item"><ShareIcon size="1em" /></span>
        <span className={mailIconClassName}><MailIcon size="1em" /></span>
      </div>
      <div
        className="next-prev"
      >
        {previousSlide &&
          <Link
            href={{
              pathname: '/CVSlide',
              query: { slidename: previousSlide },
            }}
            as={`/cv/${previousSlide}`}
            prefetch
          >
            <a className="nav-item">
              <ArrowLeftIcon size="1em" />
            </a>
          </Link>
        }
        {nextSlide &&
          <Link
            href={{
              pathname: '/CVSlide',
              query: { slidename: nextSlide },
            }}
            as={`/cv/${nextSlide}`}
            prefetch
          >
            <a className="nav-item">
              <ArrowRightIcon size="1em" />
            </a>
          </Link>
        }
      </div>
      <style jsx>{styles}</style>
    </nav>
  )
}

export default Nav
