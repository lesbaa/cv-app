/* eslint-env browser */
export default function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let success = false

  try {
    success = document.execCommand('copy')
  } catch (err) {
    console.error('Unable to copy to clipboard: ', err)
  }
  document.body.removeChild(textArea)
  return success
}
