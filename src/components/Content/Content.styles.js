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
    color: rgb(255, 50, 50);
  }

  .content-blurb :global(.human-too) > :global(span:nth-of-type(2n)) {
    color: rgb(60, 255, 60);
  }

  .content-blurb :global(.human-too) > :global(span:nth-of-type(3n)) {
    color: rgb(220, 100, 0);
  }

  .content-blurb :global(.human-too) > :global(span:nth-of-type(4n)) {
    color: rgb(0, 90, 240);
  }

  .content-blurb :global(.human-too) > :global(span:nth-of-type(5n)) {
    color: inherit;
  }

  @media screen and (min-width: 500px) {
    .Content {
      width: 30%;
    }
  }
`
