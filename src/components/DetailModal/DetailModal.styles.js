import css from 'styled-jsx/css'

export default css`
  .DetailModal {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: calc(30% + 15vw);
    height: 100%;
    transition: -webkit-clip-path 1s, clip-path 1s;
    transform: translateX(0);
    clip-path: circle(150% at bottom right);
    font-size: 0.8em;
    z-index: 3;
  }
  
  .content {
    margin: 7.5vh;
    mix-blend-mode: color-burn;
  }
  
  .description {
    border-width: 1px 0 1px 0;
    border-color: #444;
    border-style: solid;
    color: #333;
    font-weight: lighter;
    line-height: 1.8;
    letter-spacing: 0.1em;
  }
  
  .DetailModal.is-closed {
    transform: translateX(100%);
    clip-path: circle(0px at bottom right);
    transition: -webkit-clip-path 1s, clip-path 1s, transform 0.01s 1s;
  }

  .close-icon:hover > :global(svg) {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }

  .close-icon > :global(svg) {
    stroke: #333;
    stroke-width: 1.5;
  }

  .close-icon {
    padding: 0;
    appearance: none;
    border-width: 0;
    font-size: 1.1em;
    margin-top: 0.5em;
    float: right;
  }

`
