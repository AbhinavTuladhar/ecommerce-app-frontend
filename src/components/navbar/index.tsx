'use client'

import FirstNavRow from './first-nav-row'
import SecondNavRow from './second-nav-row'

const Navbar = () => {
  return (
    <header className="content-grid divide-y divide-gray-600 bg-slate-800 text-white">
      <div className="content">
        <FirstNavRow />
      </div>
      <div className="content-grid py-3">
        <SecondNavRow />
      </div>
    </header>
  )
}

export default Navbar
