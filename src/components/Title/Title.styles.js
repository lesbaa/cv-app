import css from 'styled-jsx/css'

export default css`
  .Title {
    width: 100%;
    padding: 0;
    font-size: 3.5em;
    margin: 0 0 1em 0;
  }

  .text-node {
    display: inline-block;
    mix-blend-mode: color-burn;
    background: #000;
    color: #fff;
    position: relative;
    z-index: 99;
    font-family: sans-serif;
    font-weight: bold;
    padding: 0 .1em;
  }
  
  .text-node:after {
    content: attr(data-text);
    mix-blend-mode: screen;
    background: #fff;
    opacity: 0.65;
    color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 99;
    font-family: sans-serif;
    font-weight: bold;
    padding: 0 .1em;
  }
`  
