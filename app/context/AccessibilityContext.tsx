import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

type FontSize = 'normal' | 'large'
type AccessibilitySettingsProps = {
  highContrast: boolean
  fontSize: FontSize
  setHighContrast: (value: boolean) => void
  setFontSize: (size: FontSize) => void
}

type AccessibilityProviderProps = {
  children: ReactNode
}

const defalutSettings: AccessibilitySettingsProps = {
  highContrast: false,
  fontSize: 'normal',
  setHighContrast: () => { },
  setFontSize: () => { },
}

const AccessibilityContext = createContext<AccessibilitySettingsProps>(defalutSettings)

export const useAccessibility = () => useContext(AccessibilityContext)

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {  
  const location = useLocation()
  const navigate = useNavigate()

  /* const getInitialState = (): [boolean, FontSize] => {
    if (typeof window === 'undefined') {
      return [false, 'normal']
    }

    const params = new URLSearchParams(window.location.search)
    const hcParam = 
      (params.get('contrast')) === 'high' ||
      localStorage.getItem('highContrast') === 'true' ||
      false
    const fcParam = 
      (params.get('font') as FontSize) ||
      (localStorage.getItem('fontSize') as FontSize) ||
      'normal'

      return [hcParam, fcParam]
  } */

  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<FontSize>('normal')

  const updateURL = (newHighContrast: boolean, newFontSize: FontSize) => {
    const params = new URLSearchParams(location.search)

    if (newHighContrast) {
      params.set('contrast', 'high')
    } else {
      params.delete('contrast')
    }

    if (newFontSize !== 'normal') {
      params.set('font', newFontSize)
    } else {
      params.delete('font')
    }

    navigate({ search: params.toString() }, { replace: true })
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const hcParam =
      params.get('contrast') === 'high' ||
      localStorage.getItem('highContrast') === 'true'
    const fcParam =
      (params.get('font') as FontSize) ||
      (localStorage.getItem('fontSize') as FontSize) ||
      'normal'
  
    setHighContrast(hcParam)
    setFontSize(fcParam)
  }, [])

  useEffect(() => {
    localStorage.setItem('highContrast', highContrast.toString())
    localStorage.setItem('fontSize', fontSize)

    updateURL(highContrast, fontSize)
  }, [highContrast, fontSize])

  const value: AccessibilitySettingsProps = {
    highContrast,
    fontSize,
    setHighContrast: setHighContrast,
    setFontSize: setFontSize,
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}