import css from 'styled-jsx/css'

export default css`
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(359.99deg);
    }
  }

  .Loader {
    position: absolute;
    top: 1em;
    right: 1em;
    opacity: 0;
    display: block;
    width: 2.5em;
    height: 2.5em;
    box-sizing: border-box;
    border-radius: 50%;
    border-width: 3px;
    border-style: solid;
    border-color: #444 transparent #444 transparent;
    animation: rotate 0.5s linear infinite;
    transition: opacity 0.2s;
  }

  .loading {
    opacity: 1;
    mix-blend-mode: color-burn;
  }
`
