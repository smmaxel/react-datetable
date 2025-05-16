import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DataTableDetails } from "~/components/DataTable/DataTableDetails";
import { fetchIssues, type Issue } from "~/data/issues";

const BreadCrumbs = ({ id, issueType, navigate }: { id: number, issueType: string, navigate: (arg: string) => void }) => {
  return (
    <>
      <nav className="flex flex-row mb-4 gap-1 text-sm items-center">
        <button
          className="link-button focus-visible:outline-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <span className="separator">/</span>
        <span>{id}</span>
      </nav>

      <h1 className="text-2xl font-bold mb-2">
        ID: {id} / {issueType}
      </h1>
    </>
  )
}

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
      <BreadCrumbs id={issue.id} issueType={issue.issueType} navigate={navigate} />
      <DataTableDetails item={issue} />
    </main>
  )
}