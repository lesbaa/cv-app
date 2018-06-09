import {
  RECEIVE_SKILLS,
} from '~/constants/actionTypes'

const mapArrayToKeyValueStore = ({
  key = 'id',
  array,
}) => {
  if (!Array.isArray(array)) {
    console.error('mapArrayToKeyValueStore: invalid object passed as argument!')
    return []
  }
  return array.reduce((keyValueStore, arrayItem) => {
    return {
      ...keyValueStore,
      [arrayItem[key]]: arrayItem,
    }
  }, {})
}

const defaultState = {}

export default function (state = defaultState, {
  type,
  payload = {},
}) {

  switch (type) {
    case RECEIVE_SKILLS: {
      return {
        ...state,
        [payload.skillType]: {
          ...state[payload.skillType],
          ...mapArrayToKeyValueStore({
            key: 'id',
            array: payload.skills,
          }),
        }
      }
    }

    default: {
      return state
    }

  }
}
