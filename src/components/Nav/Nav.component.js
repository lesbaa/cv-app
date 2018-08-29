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
import { DIALOG_TIMEOUT } from '~/../les.config'
import styles from './Nav.styles'

// TODO obfuscate / client side only this to avoid bots
const mailtoLink = 'mailto:les@lesmoffat.co.uk?subject=Whassssssssuuuuppppp&body=Hey%20Les%2C%20I\'ve%20just%20had%20a%20look%20at%20your%20CV%20and%20I\'d%20love%20to%20find%20out%20more%20about%20your%20gif%20prowess.%20Could%20we%20organise%20a%20chat%20and%20find%20out%20more%20about%20how%20your%20gifs%20could%20improve%20my%20organisation%3F'

const Nav = ({
  previousSlide,
  nextSlide,
  showInfoDialog,
}) => {

  const mailIconClassName = [
    'nav-item',
    !nextSlide && 'tadaa-anim',
  ]
    .filter(Boolean)
    .join(' ')

  const codeIconClassName = [
    'nav-item',
    !previousSlide && 'tadaa-anim',
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
        <span className={codeIconClassName}>
          <a
            href="https://github.com/lesbaa/cv-app"
            rel="noopener noreferrer"
            target="_blank"
            title="view the source for this app"
          >
            <CodeIcon size="1em" />
          </a>
        </span>
        <span
          className="nav-item"
        >
          <a
            href="#"
            onClick={handleClick(showInfoDialog)}
            title="copy the url of this page to the clipboard"
          >
            <ShareIcon size="1em" />
          </a>
        </span>
        <span className="nav-item">
          <a
            href="//www.linkedin.com/in/lesmoffat/"
            title="find me on linked in!"
          >
            <LinkedInIcon size="1em" />
          </a>
        </span>
        <span className={mailIconClassName}>
          <a
            href={mailtoLink}
            title="send me a message!"
          >
            <MailIcon size="1em" />
          </a>
        </span>
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

Nav.propTypes = {
  previousSlide: PropTypes.string,
  nextSlide: PropTypes.string,
  showInfoDialog: PropTypes.bool,
}

Nav.defaultProps = {
  previousSlide: 'hello',
  nextSlide: 'hello',
  showInfoDialog: false,
}

function handleClick(showInfoDialog) {
  return () => {
    const copySuccess = copyToClipboard(window.location.href)
    if (copySuccess) {
      showInfoDialog({
        message: 'Url copied to clipboard!',
        timeout: DIALOG_TIMEOUT,
      })
    } else {
      showInfoDialog({
        message: 'Oops! Unable to copy to clipboard!',
        timeout: DIALOG_TIMEOUT,
      })
    }
  }
}

export default Nav
