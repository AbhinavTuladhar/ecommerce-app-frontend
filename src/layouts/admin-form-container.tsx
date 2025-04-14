import React, { ReactNode } from 'react'

const AdminFormContainer = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-gray-500 bg-slate-800 p-4">{children}</div>
)

export default AdminFormContainer
