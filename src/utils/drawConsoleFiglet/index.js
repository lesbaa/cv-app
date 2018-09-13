/* eslint-disable no-confusing-arrow */
/* eslint-disable no-console */

// just a bit of fun :-)
// hence no tests

const figlet = `
%c 888                       e   e                dP,e,  dP,e,           d8   
%c 888      ,e e,   dP"Y    d8b d8b     e88 88e   8b "   8b "   ,"Y88b  d88   
%c 888     d88 88b C88b    e Y8b Y8b   d888 888b 888888 888888 "8" 888 d88888 
%c 888  ,d 888   ,  Y88D  d8b Y8b Y8b  Y888 888P  888    888   ,ee 888  888   
%c 888,d88  "YeeP" d,dP  d888b Y8b Y8b  "88 88"   888    888   "88 888  888   
%c ========================================================================== 
%c                You should totally give him the job, btw.                    
%c ========================================================================== 
`

const figletStyles = blendHex('#c0f6b6', '#f6a6b4', 8)
  .map((color, i) => `color: ${color};`)

function stepHex(start, stop, steps) {
  const stepSize = (stop - start) / steps
  return Array
    .from(
      Array(steps),
      (el, i) => (~~(start + i * stepSize)).toString(16)
    )
    .map(el => el.length < 2 ? `0${el}` : el)
}

function splitHexToRGB(hexColor) {
  const splitRegex = /.{1,2}/g

  return hexColor
    .replace('#', '')
    .match(splitRegex)
    .map(el => parseInt(el, 16))
}

function blendHex(from, to, steps) {
  const fromRGB = splitHexToRGB(from)
  const toRGB = splitHexToRGB(to)

  const blended = fromRGB
    .map((channel, i) => stepHex(channel, toRGB[i], steps))

  return blended[0].map((el, i) => `#${blended[0][i]}${blended[1][i]}${blended[2][i]}`)
}

export default () => console.log(figlet, ...figletStyles)
