'use client'

import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      return res.json()
    },
  })

  if (isLoading) {
    return <div> Loading... </div>
  }

  return (
    <div className="min-h-dvh bg-slate-800 text-white">
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}
