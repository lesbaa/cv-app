import css from 'styled-jsx/css'

export default css`
  .Title {
    width: 100%;
    padding: 0;
    font-size: 3.5em;
    margin: 0 0 0.5em 0;
    font-weight: bold;
    mix-blend-mode: color-burn;
    letter-spacing: -0.02em;
    font-family: 'LeagueSpartan'
  }

  .Title :global(strong) {
    position: relative;
    padding-bottom: 1em;
    height: 0;
    overflow: hidden;
    display: block;
  }

  :global(strong.title-les) {
    font-family: 'LeagueSpartan';
    font-size: 3.6em;
    position: absolute;
    top: 0;
    left: -0.036em;
    width: 100%;
    height: 100%;
  }
`
