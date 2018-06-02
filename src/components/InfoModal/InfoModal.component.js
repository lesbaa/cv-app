import React from 'react'
import styles from './DetailModal.styles'

const InfoModal = ({
  id,
  title,
  content,
  closeModal,
}) => (
  <aside
    className="InfoModal"
  >
    <style jsx>{styles}</style>
  </aside>
)

export default DetailModal
