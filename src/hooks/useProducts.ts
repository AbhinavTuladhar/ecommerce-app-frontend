import ProductService from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

const useProducts = () =>
  useQuery({
    queryKey: ['product'],
    queryFn: () => ProductService.getProducts,
    retry: false,
  })

export default useProducts
