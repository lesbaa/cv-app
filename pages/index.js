/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import PageWrapper from '~/components/PageWrapper'
import Gradient from '~/components/Gradient'
import LesAnimation from '~/components/LesAnimation'
import GitHubIcon from 'react-feather/dist/icons/github'
import CodePenIcon from 'react-feather/dist/icons/codepen'
import CodeIcon from 'react-feather/dist/icons/code'
import TwitterIcon from 'react-feather/dist/icons/twitter'
import MailIcon from 'react-feather/dist/icons/mail'
import PhoneIcon from 'react-feather/dist/icons/phone'
import GiftIcon from 'react-feather/dist/icons/gift'

const phone = '+44-759-921-353-9'

const mail = 'les-@le-smo-ffa-t.c-o.u-k'

const unjumble = (string) => {
  return string.split('-')
    .reverse()
    .join('')
}

class IndexPage extends Component {
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

  render = () => (
    <PageWrapper>
      <Gradient />
      <main
        className="Main"
      >
        <LesAnimation />
        <div className="links">
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
            href="//"
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
          <a
            title="view my cv..."
            href="/cv"
          >
            <GiftIcon />
          </a>
        </div>
      </main>
      <style jsx>{`
        .Main {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100vh;
        }

        a {
          color: #333;
          margin: 1em;
        }

        .links {
          display: inline-flex;
          width: 40vw;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </PageWrapper>
  )
}

// TODO default props

export default IndexPage
