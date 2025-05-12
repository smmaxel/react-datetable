import { useEffect, useState } from "react"
import { validateIssueData } from "~/utils/validateIssueData"

type DataSourceInputHeaderProps = {
  url: string
  onLoad: (url: string) => void
  onReset: () => void
}

export function DataSourceInputHeader({ url, onLoad, onReset }: DataSourceInputHeaderProps) {
const [showInput, setShowInput] = useState(false)
const [inputUrl, setInputUrl] = useState(url)

  const handleLoad = () => {
    onLoad(inputUrl)
    setShowInput(false)
  }

  const handleReset = () => {
    onReset()
    setInputUrl('')
    if (showInput && !inputUrl) {
      setShowInput(false)
    }
  }

  return (
    <header className="flex flex-row justify-between items-center h-[2rem] mb-1">
      <h1>Issues</h1>
      
      <div className="flex flex-row gap-2 items-center">
        <button 
          className="text-sm cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          {!showInput && <span>&#9881;</span>}
        </button>

        {showInput && (
          <div className="flex gap-2 items-center">
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="URL to remote JSON data"
              className="h-[2rem] border rounded-[0.5rem] w-full"
            />
            <button
              className="px-2 py-1 bg-blue-600 text-white rounded-[0.5rem]"
              onClick={handleLoad}
            >
              Load
            </button>
            <button
              className="px-2 py-1 bg-gray-400 text-white rounded-[0.5rem]"
              onClick={handleReset}
            >
              {showInput && !inputUrl ? 'Hide' : 'Reset'}
            </button>
          </div>
        )}

        {url && !showInput && (
          <div
            className="flex items-center text-sm text-gray-600 bg-gray-100 p-1 rounded-[0.5rem]"
            aria-hidden
          >
            Custom data loaded from <span className="font-mono">{url}</span>
            <button onClick={handleReset} className="ml-2 text-red-500">x</button>
          </div>
        )}
      </div>
    </header>
  )
}