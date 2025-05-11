import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DataTableDetails } from "~/components/DataTable/DataTableDetails";
import { fetchIssues, type Issue } from "~/data/issues";

export default function IssueDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [issue, setIssue] = useState<Issue | null>(null)

  useEffect(() => {
    fetchIssues().then((data) => {
      const match = data.find((i) => i.id === Number(id))
      if (match) {
        setIssue(match)
      }
    })
  }, [id])

  if (!issue) {
    return (
      <p>Loading issue...</p>
    )
  }

  return (
    <main className="p-4">
      <nav className="flex flex-row mb-4 gap-1 text-sm items-center">
        <button
          className="text-blue-600 underline hover:text-blue-800 cursor-pointer focus:outline-none"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <span className="text-gray-500">/</span>
        <span className="text-black">{issue.id}</span>
      </nav>
      
      <h1 className="text-xl font-bold mb-2">
        ID: {issue.id} / {issue.issueType}
      </h1>

      <DataTableDetails item={issue} />
    </main>
  )
}