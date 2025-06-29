import React, { FC, HTMLAttributes } from 'react'
import Link from 'next/link'
import { IoTrashOutline } from 'react-icons/io5'
import { TiEdit } from 'react-icons/ti'

import useToggle from '@/hooks/useToggle'

import ConfirmationModal from '../../ui/confirmation-modal'

interface AdminProps {
  resourceName: string
  editLink: string
  onDelete: () => void
}

const ActionButtonContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    {...props}
    className="cursor-pointer rounded-md border border-gray-500 bg-gradient-to-br from-zinc-700 to-zinc-600 p-2 duration-300 hover:brightness-110"
  >
    {children}
  </div>
)

const ResourceActions: FC<AdminProps> = ({ resourceName, editLink, onDelete }) => {
  const { value: isModalOpen, setValue: openModal, resetValue: closeModal } = useToggle()

  const handleDelete = () => {
    closeModal()
    onDelete()
  }

  return (
    <>
      <div className="flex gap-x-2">
        <Link href={editLink}>
          <ActionButtonContainer>
            <TiEdit />
          </ActionButtonContainer>
        </Link>
        <ActionButtonContainer onClick={openModal}>
          <IoTrashOutline />
        </ActionButtonContainer>
      </div>
      <ConfirmationModal
        modalTitle={`Are you sure you want to delete this ${resourceName}?`}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        actionHandler={handleDelete}
      />
    </>
  )
}

export default ResourceActions
