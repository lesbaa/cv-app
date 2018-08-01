import React from 'react'
import PropTypes from 'prop-types'
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

DetailModal.propTypes = {
  skillId: PropTypes.string,
  modalTitle: PropTypes.string,
  modalContent: PropTypes.string,
  modalIsVisible: PropTypes.bool,
  hideSkillDetailModal: PropTypes.func,
  palette: PropTypes.shape({
    gradient: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
}

DetailModal.defaultProps = {
  skillId: '',
  modalTitle: '',
  modalContent: '',
  modalIsVisible: false,
  hideSkillDetailModal: () => console.log('DetailModal: no hideSkillDetailModal prop passed'),
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
    colors: [
      '#eee6ee',
      '#d9d9d9',
    ],
  },
}

export default DetailModal
