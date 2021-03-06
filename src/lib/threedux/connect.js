import withStateTransition from './withStateTransition'

const threeConnect = store => (
  mapStateToObj3D,
  mapDispatchToObj3D = dispatch => dispatch,
) => (obj3D) => {

  const clonedObject = withStateTransition(obj3D)

  store.subscribe(() => {
    const state = store.getState()
    const mappedState = mapStateToObj3D(state, clonedObject)
    if (mappedState) clonedObject.setState(mappedState)
  })

  clonedObject.actions = mapDispatchToObj3D(store.dispatch)

  return clonedObject
}

export default threeConnect
