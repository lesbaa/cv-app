import PropTypes from 'prop-types'

const PALETTE = PropTypes.shape({
  colors: PropTypes.arrayOf(PropTypes.string),
  gradient: PropTypes.string,
  offsetOpacity: PropTypes.number,
})

const ERROR = PropTypes.oneOfType([
  PropTypes.shape({
    statusCode: PropTypes.number,
    message: PropTypes.string,
  }),
  PropTypes.bool,
])

const SKILL = PropTypes.shape({
  _id: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  points: PropTypes.number,
  desc: PropTypes.string,
})

const REFERENCE = PropTypes.shape({
  _id: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  currentPosition: PropTypes.string,
  relationship: PropTypes.string,
  reference: PropTypes.string,
})

const SLIDE = PropTypes.shape({
  palette: PALETTE,
  _id: PropTypes.string,
  id: PropTypes.string,
  order: PropTypes.number,
  title: PropTypes.string,
  previousSlide: PropTypes.string,
  altText: PropTypes.string,
  nextSlide: PropTypes.string,
  blurbMarkup: PropTypes.string,
})

export default {
  SKILL,
  SLIDE,
  PALETTE,
  ERROR,
  REFERENCE,
}
