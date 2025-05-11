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
  isAvailable: boolean
  fallBackMessage: string
  children: ReactNode
}

const SmallCard = ({ issueName, value }: SmallCardProps) => {
  return (
    <div className="flex flex-col self-center border p-2 w-[25%]">
      <div className="border-b-2 border-dotted">{issueName}</div>
      <div className="flex self-center p-2">{value}</div>
    </div>
  )
}

const LargeCard = ({ isAvailable, fallBackMessage, children }: LargeCardProps) => {
  return (
    <div className="border w-[50%] p-4">
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
    <div className="flex flex-col mt-4">
      <div className="flex flex-row gap-2 mb-2">
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

      <div className="flex flex-row justify-between gap-2">
        <LargeCard isAvailable={!!item.codeSnippet} fallBackMessage="Code not available">
          <pre>{item.codeSnippet}</pre>
        </LargeCard>

        <LargeCard isAvailable={!!item.screenshot} fallBackMessage="Screenshot not available">
          <img src={item.screenshot} alt="Issue screenshot" />
        </LargeCard>
      </div>
      <pre
        className="bg-gray-100 text-black p-2 rounded">
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  )
}