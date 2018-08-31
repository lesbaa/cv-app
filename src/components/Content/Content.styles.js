import css from 'styled-jsx/css'

export default css`
  .Content {
    display: inline-block;
    box-sizing: border-box;
    margin: 7.5vh;
    align-items: center;
    position: relative;
    font-size: 0.8em;
    user-select: none;
  }

  .content-blurb :global(.human-too) > :global(span) {
    margin-left: 0.5em;
  }

  .content-blurb :global(.human-too) > :global(span:last-of-type) {
    margin-left: 0em;
  }

  .content-blurb :global(.human-too) > :global(span:nth-of-type(1n)) {
    color: inherit;
  }

  .content-blurb :global(.human-too) > :global(span:nth-of-type(2n)) {
    color: #554;
  }


  @media screen and (min-width: 500px) {
    .Content {
      width: 30%;
    }
  }
`
