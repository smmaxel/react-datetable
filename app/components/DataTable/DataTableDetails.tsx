import { useEffect, type ReactNode } from "react"
import { useIssueContext } from "~/context/IssueContext"
import type { Issue } from "~/data/issues"

type DataTableDetailsPorps = {
  item: Issue
}

type SmallCardProps = {
  issueName: string
  value: string
}

type LargeCardProps = {
  issueName: string
  isAvailable: boolean
  fallBackMessage: string
  children: ReactNode
}

const SmallCard = ({ issueName, value }: SmallCardProps) => {
  return (
    <div className="flex flex-col self-center border p-2 w-full sm:w-[48%] md:w-[32%] break-words">
      <div className="border-b-2 border-dotted">{issueName}</div>
      <div className="flex self-center p-2">{value}</div>
    </div>
  )
}

const LargeCard = ({ issueName, isAvailable, fallBackMessage, children }: LargeCardProps) => {
  return (
    <div className="border p-4 w-full sm:w-[50%]">
      <div className="border-b-2 border-dotted mb-2">{issueName}</div>
      {isAvailable ? children : (
        <div className="flex justify-center items-center h-full text-gray-500">
          {fallBackMessage}
        </div>
      )}
    </div>
  )
}

export function DataTableDetails({
  item,
}: DataTableDetailsPorps) {

  const { dispatch } = useIssueContext()

  useEffect(() => {
    dispatch({ type: 'SELECT_ISSUE', payload: item.id })
  }, [item.id, dispatch])

  /* 
  {
    "id": 3,
    "issueType": "Accessible Name",
    "severity": "Critical",
    "component": "AAA",
    "selector": ".foo#bing > #bar",
    "url": "https://www.zzzz.co.uk",
    "description": "Image button lacks accessible name.",
    "codeSnippet": "<img src='image.png' alt=''>",
    "screenshot": "https://via.placeholder.com/150"
  }
  */

  return (
    <div className="flex flex-col mt-4 space-y-4">
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-2">
        {item.issueType && (
          <SmallCard issueName="Issue Type" value={item.issueType} />
        )}

        {item.severity && (
          <SmallCard issueName="Severity" value={item.severity} />
        )}

        {item.component && (
          <SmallCard issueName="Component" value={item.component} />
        )}

        {item.selector && (
          <SmallCard issueName="Selector" value={item.selector} />
        )}

        {item.url && (
          <SmallCard issueName="URL" value={item.url} />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <LargeCard issueName="Code Snippet" isAvailable={!!item.codeSnippet} fallBackMessage="Code not available">
          <pre>{item.codeSnippet}</pre>
        </LargeCard>

        <LargeCard issueName="Screenshot" isAvailable={!!item.screenshot} fallBackMessage="Screenshot not available">
          <img src={item.screenshot} alt="Issue screenshot" />
        </LargeCard>
      </div>
    </div>
  )
}