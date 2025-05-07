import type { Issue } from "~/data/issues"

type DataTableDetailsPorps = {
  item: Issue
}

export function DataTableDetails({
  item,
}: DataTableDetailsPorps) {

  return (
    <div>
      <pre
        className="bg-gray-100 text-black p-2 rounded">
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  )
}