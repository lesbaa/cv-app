import withStateTransition from './withStateTransition'

const clone = obj => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

const threeConnect = store => (
  mapStateToObj3D,
  mapDispatchToObj3D,
) => (obj3D) => {
  const clonedObject = withStateTransition(clone(obj3D))

  store.subscribe(() => {
    const state = store.getState()
    const mappedState = mapStateToObj3D(state, clonedObject)
    if (mappedState) clonedObject.setState(mappedState)
  })

  clonedObject.actions = mapDispatchToObj3D(store.dispatch)

  return clonedObject
}

export default threeConnect
