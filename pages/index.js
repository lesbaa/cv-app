/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'proptypes'
import GitHubIcon from 'react-feather/dist/icons/github'
import CodePenIcon from 'react-feather/dist/icons/codepen'
import CodeIcon from 'react-feather/dist/icons/code'
import TwitterIcon from 'react-feather/dist/icons/twitter'
import MailIcon from 'react-feather/dist/icons/mail'
import PhoneIcon from 'react-feather/dist/icons/phone'
import GiftIcon from 'react-feather/dist/icons/gift'
import PageWrapper from '~/components/PageWrapper'

const unjumble = string =>
  string.split('-')
    .reverse()
    .join('')

class IndexPage extends Component {
  static pageTransitionDelayEnter = true

  state = {
    phoneNumber: '-539-213-599-447-+',
    mailto: 'uk-co.-at.-off-les-es@-l',
  }

  componentDidMount = () => {
    const {
      phoneNumber,
      mailto,
    } = this.state
    this.setState({
      phoneNumber: `tel:${unjumble(phoneNumber)}`,
      mailto: `mailto:${unjumble(mailto)}`,
    })
  }

  render = () => {
    return (
      <PageWrapper
        title=""
      >
        <main
          className="main"
        >
          <h1 className="les-anim">
            <strong><x-lesanim offsetY="20">LesMoffat.</x-lesanim></strong>
          </h1>
          <div className="job-title fade-in">
            Level 16 Code-smuggler.
          </div>
          <div className="index-links">
            <Link
              href={{
                pathname: '/cv/hello',
                query: { slidename: 'hello' },
              }}
              as="/cv/hello"
              prefetch
            >
              <a
                title="view my cv..."
              >
                <GiftIcon />
              </a>
            </Link>
            <a
              title="go to my github..."
              href="//github.com/lesbaa"
            >
              <GitHubIcon />
            </a>
            <a
              title="view my pens..."
              href="//codepen.io/lesbaa"
            >
              <CodePenIcon />
            </a>
            <a
              title="see the source to this site..."
              href="//" // this will need entered
            >
              <CodeIcon />
            </a>
            <a
              title="tweet me..."
              href="//twitter.com/@_lesbaa_"
            >
              <TwitterIcon />
            </a>
            <a
              title="mail me..."
              href={this.state.mailto}
            >
              <MailIcon />
            </a>
            <a
              title="call me..."
              href={this.state.phoneNumber}
            >
              <PhoneIcon />
            </a>
          </div>
        </main>
        <style jsx>{`
          .main {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
          }

          a {
            color: #333;
            margin: 1em;
          }

          .index-links {
            display: inline-flex;
            width: 100vw;
            justify-content: center;
            align-items: center;
            z-index: 1;
            font-weight: bolder;
          }

          .les-anim {
            width: 45%;
          }

          .job-title {
            font-family: 'LeagueSpartan';
            z-index: 1;
            font-size: 1.5em;
            text-align: center;
            width: 30%;
          }

          .main :global(strong) {
            position: relative;
            padding-bottom: 20%;
            height: 0;
            overflow: hidden;
            display: block;
          }
        
          .main :global(strong) :global(x-lesanim) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: transparent;
          }

        `}</style>
      </PageWrapper>
    )
  }
}

IndexPage.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func,
}

IndexPage.defaultProps = {
  pageTransitionReadyToEnter: () => {},
}

// TODO more proptypes!

export default IndexPage
