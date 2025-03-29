import { useRouter } from 'next/navigation'
import { IoIosLogOut } from 'react-icons/io'
import { toast } from 'react-toastify'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import useToggle from '@/hooks/useToggle'
import AuthService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'

const Logout = () => {
  const { push } = useRouter()
  const { value: isModalOpen, setValue: openModal, resetValue: closeModal } = useToggle()

  const { mutate } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      toast.success('Logout successful')
      push('/admin/login')
    },
    onError: () => {
      toast.error('Logout failed')
    },
  })

  const handleLogout = () => {
    mutate()
    closeModal()
  }

  return (
    <>
      <div className="py-2">
        <button
          className="flex w-full cursor-pointer items-center gap-x-2 px-4 py-4 duration-300 hover:bg-blue-900"
          onClick={openModal}
        >
          <IoIosLogOut className="text-2xl" />
          <span> Logout </span>
        </button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold">Are you sure you want to log out?</h2>
          <div className="flex justify-center gap-x-10">
            <Button onClick={closeModal}> Cancel</Button>
            <Button onClick={handleLogout}> Confirm </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Logout
