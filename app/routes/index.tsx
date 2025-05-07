import { useEffect, useState } from "react";
import { type Issue, fetchIssues } from "~/data/issues";
import { useNavigate } from "react-router";
import { DataTable } from "~/components/DataTable/DataTable";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchIssues().then(setIssues)
  }, [])

  const columns = [
    { header: 'Type', accessor: 'issueType' },
    { header: 'Severity', accessor: 'severity' },
    { header: 'Component', accessor: 'component' },
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
