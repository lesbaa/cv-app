/* eslint-env browser */
export function fallbackCopyTextToClipboard(text) {
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

export default async function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text)
  }
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.log('Unable to copy to clipbpard: ', err)
    return false
  }
}
