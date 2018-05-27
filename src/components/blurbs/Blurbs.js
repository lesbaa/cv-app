import React from 'react'
import {
  HELLO,
  DEV_SKILLS,
  SOFT_SKILLS,
  UP_NEXT,
  HUMAN_TOO,
  HIRE_ME,
} from '~/constants/slideNames'

export const Hello = [
  <p>
    I’m a human based in Glasgow, Scotland. I have experience <em><strong>solving</strong></em> a wide variety of <em><strong>problems</strong></em> in both front-end and back-end domains.
  </p>,
  <p>
    Day to day, I’m a <em><strong>JavaScript Developer.</strong></em>
  </p>,
  <p>
    But really, I just like making cool stuff with just about anything
  </p>,
  <p>
    Let me show you what I do and why I do it
  </p>,
]

export const DevSkills = [
  <p>I would describe myself as a jack of all trades, master of some.</p>,
  <p>Whilst I mostly work day to day in JavaScript / React / Redux / CSS / HTML5, I have also gained some experience in other languages, frameworks and tech.</p>,
  <p>My real passion is the web as a platform and all the cool APIs that come along with it such as WebGL, WebAudio, WebMIDI, PWAs, and how they can all be tied together into new and awesome things.</p>,
  <p>Click on a skill for more info or click-drag to move around.</p>,
]

export const SoftSkills = [
  <p>Through work, travelling and education. I’ve accrued a variety of non-dev skills too.</p>,
  <p>Click on a skill for more info or click-drag to move around.</p>,
]

export const UpNext = [
  <p>It’s a big ‘ol internet out there. There’s still so much more I want to learn, contribute to and build upon.</p>,
  <p>Learning is a journey, not a destination, you can never know everything.  But I want to give it a damn good shot.</p>,
]

export const HumanToo = [
  <p>
    As an important aside, I’m also a person,
    <span>a user,</span>
    <span>a vegetable grower,</span>
    <span>a tinkerer,</span>
    <span>a builder of things,</span>
    <span>a jack of all trades,</span>
    <span>a master of some,</span>
    <span>an idealist,</span>
    <span>a realist,</span>
    <span>a lifelong learner,</span>
    <span>a dog dad,</span>
    <span>a hillwalker,</span>
    <span>a nature enthusiast,</span>
    <span>uma aluna de Português,</span>
    <span>a big Led Zep Fan,</span>
    <span>an okay musician,</span>
    <span>a book lover,</span>
    <span>a wannabe stoic,</span>
    <span>a Trekkie/er,</span>
    <span>a (mostly) good guy,</span>
    <span>a damn good cook,</span>
    <span>an enthusiastic, but terrible, dancer</span>
    and
    <span>maker of the best god damn hot sauce in Scotland, possibly Europe</span>
    (yeah, you heard me).
  </p>,
]

export const HireMe = [
  <p>And so, we reach the end of our journey together for now. It’s been fun.</p>,
  <p>If you’re contemplating hiring me, or just want to leave some (constructive) feedback, don’t hesitate to contact me through any of the channels below.</p>,
]

export default function getBlurbContent(slideName) {
  switch (slideName) {
    case HELLO: {
      return Hello
    }
    case DEV_SKILLS: {
      return DevSkills
    }
    case SOFT_SKILLS: {
      return SoftSkills
    }
    case UP_NEXT: {
      return UpNext
    }
    case HUMAN_TOO: {
      return HumanToo
    }
    case HIRE_ME: {
      return HireMe
    }
    default: {
      return Hello
    }
  }
}
