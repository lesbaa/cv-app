/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import Link from 'next/link'
import GitHubIcon from 'react-feather/dist/icons/github'
import CodePenIcon from 'react-feather/dist/icons/codepen'
import LinkedInIcon from 'react-feather/dist/icons/linkedin'
import TwitterIcon from 'react-feather/dist/icons/twitter'
import MailIcon from 'react-feather/dist/icons/mail'
import PhoneIcon from 'react-feather/dist/icons/phone'
import GiftIcon from 'react-feather/dist/icons/gift'
import PageWrapper from '~/components/PageWrapper'
import TrackingDialog from '~/components/TrackingDialog'
import InfoDialog from '~/components/InfoDialog'
import styles from '~/theme/index.styles'
import { chooseRandom, random } from '~/utils/rndm'

const unjumble = string =>
  string.split('-')
    .reverse()
    .join('')

class IndexPage extends Component {
  static pageTransitionDelayEnter = true

  state = {
    phoneNumber: '-539-213-599-447-+',
    mailto: 'uk-co.-at.-off-les-es@-l',
    characterClass: '',
  }

  componentDidMount = () => {
    const {
      phoneNumber,
      mailto,
    } = this.state

    const classes = [
      'Dwarven Codesmith',
      'Mage of ECMA',
      'Wise-cracking Code Smuggler',
      'Elven Code Rogue',
    ]

    this.setState({
      phoneNumber: `tel:${unjumble(phoneNumber)}`,
      mailto: `mailto:${unjumble(mailto)}`,
      characterClass: `Level ${random(20, 30)} ${chooseRandom(classes)}`,
    })
  }

  render = () => (
    <PageWrapper
      title={this.state.characterClass}
    >
      <main
        className="main"
      >
        <InfoDialog />
        <TrackingDialog />
        <h1 className="les-anim">
          <strong><x-lesanim offsetY="20">LesMoffat.</x-lesanim></strong>
        </h1>
        <div className="job-title fade-in">
          {this.state.characterClass}
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
          <a
            title="message me on linkedIn..."
            href="//www.linkedin.com/in/lesmoffat/"
          >
            <LinkedInIcon />
          </a>
        </div>
      </main>
      <style jsx>{styles}</style>
    </PageWrapper>
  )
}

IndexPage.propTypes = {
}

IndexPage.defaultProps = {
}

// TODO more proptypes!

export default IndexPage
