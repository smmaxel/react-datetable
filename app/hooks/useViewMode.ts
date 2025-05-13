import { useEffect, useState } from "react"

type ViewMode = 'scroll' | 'card'

export function useViewMode(): [ViewMode, (mode: ViewMode) => void] {
  const [viewMode, setViewMode] = useState<ViewMode>('scroll')

  useEffect(() => {
    const saved = localStorage.getItem('datatable-view') as ViewMode | null
    if (saved === 'scroll' || saved === 'card') {
      setViewMode(saved)
    }
  }, [])

  const updateMode = (newViewMode: ViewMode) => {
    localStorage.setItem('datatable-view', newViewMode)
    setViewMode(newViewMode)
  }

  return [viewMode, updateMode]
}