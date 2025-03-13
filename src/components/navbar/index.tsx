'use client'

import FirstNavRow from './first-nav-row'
import SecondNavRow from './second-nav-row'
import ThirdNavRow from './third-nav-row'

const Navbar = () => {
  return (
    <header className="content-grid divide-y divide-gray-700">
      <div className="content-grid content-grid--content bg-slate-800">
        <FirstNavRow />
      </div>
      <div className="content-grid content-grid--content bg-slate-800">
        <SecondNavRow />
      </div>
      <div className="content-grid content-grid--content border-b border-b-gray-700">
        <ThirdNavRow />
      </div>
    </header>
  )
}

export default Navbar
