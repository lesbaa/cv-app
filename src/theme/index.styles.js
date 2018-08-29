import css from 'styled-jsx/css'

export default css`
  .main {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
  }

  a {
    color: #333;
    margin: 1em;
  }

  .index-links {
    display: inline-flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    z-index: 1;
    font-weight: bolder;
  }

  .les-anim {
    width: 45%;
  }

  .job-title {
    font-family: 'LeagueSpartan';
    z-index: 1;
    font-size: 1.5em;
    text-align: center;
    width: 30%;
  }

  .main :global(strong) {
    position: relative;
    padding-bottom: 20%;
    height: 0;
    overflow: hidden;
    display: block;
  }

  .main :global(strong) :global(x-lesanim) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
  }
`
