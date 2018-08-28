import css from 'styled-jsx/css'
import { DIALOG_TIMEOUT } from '~/../les.config'

export default css`
  .Dialog {
    z-index: 999;
    position: absolute;
    text-align: center;
    top: 0;
    width: 100%;
    transition: transform ${DIALOG_TIMEOUT / 2}ms;
    transform: translateY(-200%);
  }

  .active {
    transform: translateY(0);
  }

  .Dialog :global(svg) {
    min-width: 1em;
  }

  .dialog-content {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 40%;
    max-width: 60%;
    padding: 1.0em 4.0em;
    margin: 1.0em;
    mix-blend-mode: color-dodge;
    border: 1px solid #444;
    color: #444;
    background-color: rgba(255,250,250,0.1);
    border-radius: 0.25em;
  }

  .message {
    max-width: 60%;
    font-size: 1em;
    margin-left: 1em;
    display: inline-block;
    text-align: left;
  }
`
