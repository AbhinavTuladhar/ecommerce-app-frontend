import CategoryService from '@/services/category.service'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type CategoryQueryFnData = Awaited<ReturnType<typeof CategoryService.getCategory>>

const useCategory = (
  id: string,
  options?: Omit<UseQueryOptions<CategoryQueryFnData>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<CategoryQueryFnData>({
    queryKey: ['category', id],
    queryFn: () => CategoryService.getCategory(id),
    ...options,
  })

export default useCategory
