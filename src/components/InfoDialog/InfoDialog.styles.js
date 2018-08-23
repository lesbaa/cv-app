import css from 'styled-jsx/css'
import { DIALOG_TIMEOUT } from '~/../les.config'

export default css`
  @keyframes notify {
    0%, 100% {
      transform: translateY(-200%);
    }
    20%, 80% {
      transform: translateY(0);
    }
  }

  .InfoDialog {
    position: absolute;
    text-align: center;
    top: 0;
    width: 100%;
    transform: translateY(-200%);
  }

  .active {
    animation: notify ${DIALOG_TIMEOUT}ms ease-in-out 1;
  }

  .dialog-content {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 1.0em 4.0em;
    margin-top: 1.0em;
    mix-blend-mode: color-burn;
    border: 1px solid #000;
    color: #000;
    border-radius: 0.25em;
  }

  .message {
    font-size: 1em;
    margin-left: 0.5em;
    display: inline-block;
  }
`
