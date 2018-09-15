/* eslint-env browser */
export default () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  } else {
    console.info('ServiceWorkers are not supported in this browser so git up an git on wit yo life sucka')
  }
}
