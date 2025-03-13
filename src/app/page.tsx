'use client'

import HeroBanner from '@/components/hero-banner'

export default function Home() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: async () => {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/users')
  //     return res.json()
  //   },
  // })

  // if (isLoading) {
  //   return <div className=""> Loading... </div>
  // }

  return <HeroBanner />
}
