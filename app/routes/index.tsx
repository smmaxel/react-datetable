import { useEffect, useState } from "react";
import { type Issue, fetchIssues, type IssueTableRow } from "~/data/issues";
import { useNavigate } from "react-router";
import { DataTable } from "~/components/DataTable/DataTable";
import { mapIssueToTableRows } from "~/utils/issueMapper";

export default function Home() {
  const [issues, setIssues] = useState<IssueTableRow[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchIssues().then((data) => setIssues(mapIssueToTableRows(data)))
  }, [])

  const columns = [
    { header: 'NO', accessor: 'no' },
    { header: 'ISSUE TYPE', accessor: 'issueType' },
    { header: 'SEVERITY', accessor: 'severity' },
    { header: 'COMPONENT', accessor: 'component' },
    { header: 'SELECTOR', accessor: 'selector' },
    { header: 'URL', accessor: 'url' },
  ] as const

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Issues</h1>
      <DataTable
        columns={columns}
        data={issues}
        onRowClick={(issue) => navigate(`/issues/${issue.id}`)}  
      />
    </main>
  )
}
