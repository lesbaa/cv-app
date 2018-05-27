import css from 'styled-jsx/css'

export default css`
  @font-face {
  font-family: 'LeagueSpartan';
  src: url('static/fonts/LeagueSpartan-Bold.subset.eot');
  src:  local('☺'),
        url('static/fonts/LeagueSpartan-Bold.subset.woff') format('woff'),
        url('static/fonts/LeagueSpartan-Bold.subset.ttf') format('truetype'),
        url('static/fonts/LeagueSpartan-Bold.subset.svg') format('svg');
  font-weight: bold;
  font-style: normal;
}

  @font-face {
    font-family: 'RobotoMono';
    src: url('static/fonts/RobotoMono-Bold.subset.eot');
    src:  local('☺'),
          url('static/fonts/RobotoMono-Bold.subset.woff') format('woff'),
          url('static/fonts/RobotoMono-Bold.subset.ttf') format('truetype'),
          url('static/fonts/RobotoMono-Bold.subset.svg') format('svg');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('static/fonts/RobotoMono-BoldItalic.subset.eot');
    src:  local('☺'),
          url('static/fonts/RobotoMono-BoldItalic.subset.woff') format('woff'),
          url('static/fonts/RobotoMono-BoldItalic.subset.ttf') format('truetype'),
          url('static/fonts/RobotoMono-BoldItalic.subset.svg') format('svg');
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('static/fonts/RobotoMono-Thin.subset.eot');
    src:  local('☺'),
          url('static/fonts/RobotoMono-Thin.subset.woff') format('woff'),
          url('static/fonts/RobotoMono-Thin.subset.ttf') format('truetype'),
          url('static/fonts/RobotoMono-Thin.subset.svg') format('svg');
    font-weight: lighter;
    font-style: normal;
  }

  @font-face {
    font-family: 'RobotoMono';
    src: url('static/fonts/RobotoMono-ThinItalic.subset.eot');
    src:  local('☺'),
          url('static/fonts/RobotoMono-ThinItalic.subset.woff') format('woff'),
          url('static/fonts/RobotoMono-ThinItalic.subset.ttf') format('truetype'),
          url('static/fonts/RobotoMono-ThinItalic.subset.svg') format('svg');
    font-weight: lighter;
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
    box-sizing: border-box;
    font-weight: lighter;
    font-family: 'RobotoMono', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    width: 100%;
    height: auto;
    color: #555;
    background-color: #FFF;
  }

  b {
    font-weight: bolder;
  }

  strong {
    font-weight: bold;
  }

  a {
    color: #333;
    text-decoration: underline;
    cursor: pointer;
  }

  a:visited {
    color: #666;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
    font-weight: 700;
    margin: 0;
  }

  figure, body {
    margin: 0;
    padding: 0;
  }
`