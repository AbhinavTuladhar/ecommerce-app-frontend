import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }).min(1, { message: 'Email is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
})

export const ProductSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  price: z.number().min(1, { message: 'Price is required.' }),
  quantity: z.number().min(1, { message: 'Quantity is required.' }),
  category: z.string().refine(value => value !== '', { message: 'Please select a category' }),
  image: z.string().optional(),
})
