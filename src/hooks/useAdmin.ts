import AuthService from '@/services/auth.service'
import { useQuery } from '@tanstack/react-query'

const useAdmin = () => {
  const {
    data: isAdmin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: AuthService.checkIfAdmin,
    retry: false,
  })

  return {
    isAdmin,
    isLoading,
    isError,
  }
}

export default useAdmin
