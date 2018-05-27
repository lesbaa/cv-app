import React from 'react'
import Link from 'next/link'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import ArrowRightIcon from 'react-feather/dist/icons/arrow-right'
import InfoIcon from 'react-feather/dist/icons/info'
import ShareIcon from 'react-feather/dist/icons/share-2'
import MailIcon from 'react-feather/dist/icons/mail'
import styles from './Nav.styles'

const Nav = ({
  previousSlide = 'HELLO',
  nextSlide = 'HELLO',
}) => (
  <nav
    className="Nav"
  >
    <div
      className="actions"
    >
      <span className="nav-item"><InfoIcon size="1em" /></span>
      <span className="nav-item"><ShareIcon size="1em" /></span>
      <span className="nav-item"><MailIcon size="1em" /></span>
    </div>
    <div
      className="next-prev"
    >
      <Link
        prefetch
        href={previousSlide}
      >
        <a
          className="nav-item"
          href={previousSlide}
        >
          <ArrowLeftIcon size="1em" />
        </a>
      </Link>
      <Link
        prefetch
        href={nextSlide}
      >
        <a
          className="nav-item"
          href={nextSlide}
        >
          <ArrowRightIcon size="1em" />
        </a>
      </Link>
    </div>
    <style jsx>{styles}</style>
  </nav>
)

export default Nav
