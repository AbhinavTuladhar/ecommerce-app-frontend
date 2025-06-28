import ProductService from '@/services/product.service'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type ProductQueryFnData = Awaited<ReturnType<typeof ProductService.getProduct>>

const useProduct = (
  id: string,
  options?: Omit<UseQueryOptions<ProductQueryFnData>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<ProductQueryFnData>({
    queryKey: ['product', id],
    queryFn: () => ProductService.getProduct(id),
    ...options,
  })

export default useProduct
