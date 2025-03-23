import AuthService from '@/services/auth.service'
import { useQuery } from '@tanstack/react-query'

const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: AuthService.getProfile,
    retry: false,
  })

export default useCurrentUser
