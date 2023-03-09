import { createContext, useContext, useEffect, useState } from 'react'

export type storedValueType = { id: string; nickName: string; token: string; wechat: string } | null

type setValue = (value: storedValueType) => void

type removeValue = () => void

interface props {
  storedValue?: storedValueType
  setValue?: setValue
  removeValue?: removeValue
}

const Context = createContext<props>({})

export const UserProvider: ({ children }: { children: JSX.Element }) => JSX.Element = ({ children }) => {
  const [storedValue, setStoredValue] = useState<storedValueType>(null)
  const key = 'user'

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      setStoredValue(item ? JSON.parse(item) : undefined)
    } catch (error) {
      console.warn('error', error)
      setStoredValue(null)
    }
  }, [])

  const setValue: setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const removeValue: removeValue = () => {
    try {
      setStoredValue(null)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  return <Context.Provider value={{ storedValue, setValue, removeValue }}>{children}</Context.Provider>
}

export const UseUser = () => {
  const { storedValue, setValue, removeValue } = useContext(Context)
  return { storedValue, setValue, removeValue }
}
