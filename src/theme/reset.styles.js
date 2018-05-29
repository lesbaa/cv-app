import css from 'styled-jsx/css'

export default css`
  @font-face {
    font-family: 'LeagueSpartan';
    src: url('/static/fonts/LeagueSpartan-Bold.subset.eot');
    src:  local('☺'),
          url('/static/fonts/LeagueSpartan-Bold.subset.woff') format('woff'),
          url('/static/fonts/LeagueSpartan-Bold.subset.ttf') format('truetype'),
          url('/static/fonts/LeagueSpartan-Bold.subset.svg') format('svg');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('/static/fonts/RobotoMono-Thin.subset.eot');
    src:  local('☺'),
          url('/static/fonts/RobotoMono-Thin.subset.woff') format('woff'),
          url('/static/fonts/RobotoMono-Thin.subset.ttf') format('truetype'),
          url('/static/fonts/RobotoMono-Thin.subset.svg') format('svg');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('/static/fonts/RobotoMono-ThinItalic.subset.eot');
    src:  local('☺'),
          url('/static/fonts/RobotoMono-ThinItalic.subset.woff') format('woff'),
          url('/static/fonts/RobotoMono-ThinItalic.subset.ttf') format('truetype'),
          url('/static/fonts/RobotoMono-ThinItalic.subset.svg') format('svg');
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('/static/fonts/RobotoMono-Light.subset.eot');
    src:  local('☺'),
          url('/static/fonts/RobotoMono-Light.subset.woff') format('woff'),
          url('/static/fonts/RobotoMono-Light.subset.ttf') format('truetype'),
          url('/static/fonts/RobotoMono-Light.subset.svg') format('svg');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('/static/fonts/RobotoMono-LightItalic.subset.eot');
    src:  local('☺'),
          url('/static/fonts/RobotoMono-LightItalic.subset.woff') format('woff'),
          url('/static/fonts/RobotoMono-LightItalic.subset.ttf') format('truetype'),
          url('/static/fonts/RobotoMono-LightItalic.subset.svg') format('svg');
    font-weight: 400;
    font-style: italic;
  }

  @keyframes fade {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }

  .fade-in {
    animation: .3s .25s fade backwards ease-out;
  }
  
  * {
    font-weight: 200;
    font-family: 'RobotoMono', sans-serif;
  }

  body {
    width: 100%;
    height: auto;
    color: #555;
    font-family: 'Roboto Mono', sans-serif;
    font-size: 2vh;
    background-image: linear-gradient(to bottom right, #eee6ee, #d9d9d9);
  }

  b {
    font-weight: 700;
  }

  strong {
    font-weight: 400;
  }

  a {
    color: #333;
    text-decoration: underline;
    cursor: pointer;
  }

  a:visited {
    color: #666;
  }

  figure, body {
    margin: 0;
    padding: 0;
  }
`
