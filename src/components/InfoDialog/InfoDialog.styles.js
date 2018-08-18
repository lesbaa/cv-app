import css from 'styled-jsx/css'

export default css`
  @keyframes fade-out {
    from {
      opacity: 1;
      transform: translateY(0)
    }
    to {
      opacity: 0;
      transform: translateY(-200%)
    }
  }

  .InfoDialog {
    position: absolute;
    bottom: 0;
    height: 1.5em;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em;
    mix-blend-mode: color-burn;
    animation: fade-out 1s linear 1;
    opacity: 0;
  }

  .message {
    font-size: 1em;
    margin-left: 0.5em;
    display: inline-block;
  }
`
