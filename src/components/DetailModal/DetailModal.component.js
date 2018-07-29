import React from 'react'
import Title from '~/components/Title'
import CloseIcon from 'react-feather/dist/icons/x'
import styles from './DetailModal.styles'

const DetailModal = ({
  skillId,
  modalTitle,
  modalContent,
  modalIsVisible,
  hideSkillDetailModal,
  palette,
}) => {
  const detailModalClassNames = [
    'DetailModal',
    !modalIsVisible && 'is-closed',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside
      key={skillId}
      className={detailModalClassNames}
      style={{ background: `linear-gradient(${palette.gradient})` }}
    >
      <div className="content">
        <Title title={modalTitle} />
        <div className="description">
          <span dangerouslySetInnerHTML={{ __html: modalContent }} /> {/* eslint-disable-line */}
        </div>
        <button
          className="close-icon"
          onClick={hideSkillDetailModal}
        >
          <CloseIcon />
        </button>
      </div>
      <style jsx>{styles}</style>
    </aside>
  )
}

export default DetailModal
// TODO proptypes