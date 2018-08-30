import css from 'styled-jsx/css'

export default css`

.page-transition-enter .Title,
.page-transition-enter .gradient,
.page-transition-enter .anim-scene,
.page-transition-enter .Main,
.page-transition-enter .Nav {
  transform: translateY(5vh);
  opacity: 0;
}

.page-transition-enter-active .Title,
.page-transition-enter-active .gradient,
.page-transition-enter-active .anim-scene,
.page-transition-enter-active .Main,
.page-transition-enter-active .Nav {
  transform: translateY(0);
  opacity: 1;
  transition: opacity 250ms, transform 250ms;
}

.page-transition-exit .Title,
.page-transition-exit .gradient,
.page-transition-exit .anim-scene,
.page-transition-exit .Main,
.page-transition-exit .Nav {
  transform: translateY(0);
  opacity: 1;
}

.page-transition-exit-active .Title,
.page-transition-exit-active .gradient,
.page-transition-exit-active .anim-scene,
.page-transition-exit-active .Main,
.page-transition-exit-active .Nav {
  transform: translateY(-5vh);
  opacity: 0;
  transition: opacity 250ms, transform 250ms;
}

.page-transition-enter .gradient,
.page-transition-enter .anim-scene {
  transform: translateY(0);
}
.page-transition-enter-active .gradient,
.page-transition-enter-active .anim-scene {
  transform: translateY(0);
}
.page-transition-exit .gradient,
.page-transition-exit .anim-scene {
  transform: translateY(0);
}
.page-transition-exit-active .gradient,
.page-transition-exit-active .anim-scene {
  transform: translateY(0);
}

.page-transition-exit-active .Title, 
.page-transition-enter-active .Title {
  transition-delay: 0ms
}

.page-transition-exit-active .Main, 
.page-transition-enter-active .Main {
  transition-delay: 100ms
}

.page-transition-exit-active .Nav, 
.page-transition-enter-active .Nav {
  transition-delay: 200ms
}

.page-transition-enter .PageNav {
  opacity: 0;
}
.page-transition-enter-active .PageNav {
  opacity: 1;
}
.page-transition-exit .PageNav {
  opacity: 0;
}
.page-transition-exit-active .PageNav {
  opacity: 0;
}

`
