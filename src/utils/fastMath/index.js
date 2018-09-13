/* eslint-disable no-confusing-arrow */
/* eslint-disable no-bitwise */

// hack for maths that may potentially be run 100s of times a renderloop
// the math object is great but these are *slightly* faster,

export const abs = n => n < 0
  ? ~n + 1
  : n

export const floor = n => ~~n
