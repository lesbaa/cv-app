/* eslint-env browser */
import fallbackCopyTextToClipboard from './fallbackCopyTextToClipboard'

export default async function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text)
  }
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Unable to copy to clipboard: ', err)
    return false
  }
}
