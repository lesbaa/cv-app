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
    font-style: lighter;
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
    animation: 0.3s 0.5s fade backwards ease-out;
  }

  @keyframes tadaa {
    0%, 20% {
      transform: scale(1);} 
    35% {
      transform: scale(0.9) rotate(-4deg);} 
    40%, 50%, 60%, 70% {
      transform: scale(1.5) rotate(4deg);
    }
    45%, 55%, 65% {
      transform: scale(1.5) rotate(-4deg);
    }
    75%, 100% {
      transform: scale(1) rotate(0);
    }
  }

  .tadaa-anim > *{
    animation: 3s tadaa linear infinite;
    transition: transform 0.5s;
  }

  .tadaa-anim > *:hover {
    animation: none;
  }

  @keyframes pulse {
    0%, 10%, 20% {
      transform: scale(1)
    }
    5%, 15%, 25% {
      transform: scale(1.5)
    }
  }

  * {
    font-weight: bold;
    font-family: 'RobotoMono', sans-serif;
  }

  body {
    width: 100%;
    height: auto;
    color: #353535;
    font-family: 'Roboto Mono', sans-serif;
    font-smoothing: subpixel-antialiased;
    font-size: 1.07em;
    background-image: linear-gradient(to bottom right, #eee6ee, #d9d9d9);
  }

  b {
    font-weight: 700;
  }

  strong {
    font-weight: 700;
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

  button {
    background: none repeat scroll 0 0 transparent;
    border: medium none;
    border-spacing: 0;
    color: #26589F;
    font-size: 1em;
    font-weight: normal;
    list-style: none outside none;
    margin: 0;
    padding: 0;
    text-align: left;
    text-decoration: none;
    text-indent: 0;
  }
`
