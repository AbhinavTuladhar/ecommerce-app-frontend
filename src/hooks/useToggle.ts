import { useState } from 'react'

const useToggle = (initialValue: boolean = false) => {
  const [value, setValueBoolean] = useState(initialValue)

  const setValue = () => setValueBoolean(true)
  const resetValue = () => setValueBoolean(false)
  const toggle = () => setValueBoolean(!value)

  return {
    value,
    toggle,
    setValue,
    resetValue,
  }
}

export default useToggle
