import React, { FC, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  if (typeof window === 'undefined') {
    return
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 grid place-items-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative z-50 rounded bg-gray-200 px-10 py-16 text-black"
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Modal
