import React, { FC } from 'react'

import Button from './button'
import Modal from './modal'

interface ConfirmationModalProps {
  isModalOpen: boolean
  closeModal: () => void
  modalTitle: string
  actionHandler: () => void
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isModalOpen,
  closeModal,
  modalTitle,
  actionHandler,
}) => {
  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div className="flex flex-col gap-y-8">
        <h2 className="text-3xl font-bold text-slate-700">{modalTitle}</h2>
        <div className="flex justify-center gap-x-10">
          <Button size="sm" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={actionHandler}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
