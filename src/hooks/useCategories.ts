import CategoryService from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'

const useCategories = () =>
  useQuery({
    queryKey: ['category'],
    queryFn: CategoryService.getCategories,
  })

export default useCategories
