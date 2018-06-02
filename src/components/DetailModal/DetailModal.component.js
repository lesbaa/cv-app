import React from 'react'
import styles from './DetailModal.styles'

const DetailModal = ({
  id,
  modalTitle,
  modalContent,
  modalIsVisible,
  originX,
  originY,
  hideSkillDetailModal,
}) => {
  const detailModalClassNames = [
    'DetailModal',
    modalIsVisible && 'is-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside
      className={detailModalClassNames}
      onClick={hideSkillDetailModal}
      style={{
        transform: modalIsVisible && `translate(${originX}px,${originY}px)`,
      }}
    >
      <style jsx>{styles}</style>
    </aside>
  )
}

export default DetailModal
// TODO proptypes