'use client'

import Container from '@/layouts/container'

import FirstNavRow from './first-nav-row'
import SecondNavRow from './second-nav-row'
import ThirdNavRow from './third-nav-row'

const Navbar = () => {
  return (
    <header className="divide-y divide-gray-700">
      <Container className="bg-slate-800">
        <FirstNavRow />
      </Container>
      <Container className="bg-slate-800">
        <SecondNavRow />
      </Container>
      <Container className="border-b border-b-gray-700">
        <ThirdNavRow />
      </Container>
    </header>
  )
}

export default Navbar
