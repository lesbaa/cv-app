import css from 'styled-jsx/css'

export default css`
  .Nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6em;
    margin-top: 0.5em;
    mix-blend-mode: color-burn;
    z-index: 1;
  }

  .nav-item:hover :global(svg) {
    opacity: 0.5;
    transition: 0.5s;
    cursor: pointer;
  }

  .nav-item :global(svg) {
    stroke: #333;
    stroke-width: 1.5;
  }

  .nav-item {
    text-decoration: none;
  }

  .nav-item:after {
    content: '/';
    margin: 0.2em;
  }

  .nav-item:last-of-type:after {
    content: none;
  }

  .next-prev,
  .actions, {
    display: inline-flex;
    align-items: center;    
  }
`
