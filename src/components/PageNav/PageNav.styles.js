import css from 'styled-jsx/css'

export default css`
  .PageNav {
    position: absolute;
    right: -4em;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(0);
    mix-blend-mode: color-burn;
    z-index: 2;
  }

  .nav-links {
    display: inline-block;
    margin: auto 0;
    padding: 0;
  }

  .chevron {
    vertical-align: middle;
    line-height: 100%;
    padding: 0.5em 0;
    border: 1px solid #444;
    border-right-width: 0;
    border-radius: 100% 0 0 100%;
  }

  .PageNav,
  .chevron,
  .nav-item,
  .nav-item a {
    transition: 0.25s opacity, 0.5s transform;
  }

  .nav-item {
    margin: 0.5em;
    display: block;
  }

  .nav-item:hover {
    opacity: 0.6;
  }

  .nav-item.active {
    transform: scale(1.4);
    opacity: 0.6;
  }

  .nav-item.active a {
    cursor: default;
  }

  .nav-item > :global(svg) {
    height: 2.5em;
    width: 2.5em;
  }

  .PageNav:hover {
    transform: translateX(-70%);
  }


  .PageNav:hover .chevron {
    opacity: 0;
  }
`
