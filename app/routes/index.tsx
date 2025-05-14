import { useEffect, useState } from "react";
import { fetchIssues, type IssueTableRow } from "~/data/issues";
import { useNavigate } from "react-router";
import { DataTable } from "~/components/DataTable/DataTable";
import { mapIssueToTableRows } from "~/utils/issueMapper";
import { DataSourceInputHeader } from "~/components/DataSourceInputHeader/DataSourceInputHeader";
import { fetchCustomIssues } from "~/utils/fetchCustomIssues";
import { AccessibilitySwitcher } from "~/components/AccessibilitySwitcher/AccessibilitySwitcher";

export default function Home() {
  const [issues, setIssues] = useState<IssueTableRow[]>([])
  const [url, setUrl] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('customDataUrl') || '' : ''
  )
  const navigate = useNavigate()

  //  https://jsonkeeper.com/b/JRFY

  const handleLoad = async (customUrl: string) => {
    try {
      const data = await fetchCustomIssues(customUrl)
      setIssues(mapIssueToTableRows(data))
      localStorage.setItem('customDataUrl', customUrl)
      setUrl(customUrl)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleRest = () => {
    localStorage.removeItem('customDataUrl')
    setUrl('')
    fetchIssues().then((data) => setIssues(mapIssueToTableRows(data)))
  }

  useEffect(() => {
    if (url) {
      fetchCustomIssues(url)
        .then((data) => setIssues(mapIssueToTableRows(data)))
        .catch((e) => console.log(e.message))
    } else {
      fetchIssues().then((data) => setIssues(mapIssueToTableRows(data)))
    }
  }, [url])

  const columns = [
    { header: 'NO', accessor: 'no' },
    { header: 'ISSUE TYPE', accessor: 'issueType' },
    { header: 'SEVERITY', accessor: 'severity' },
    { header: 'COMPONENT', accessor: 'component' },
    { header: 'SELECTOR', accessor: 'selector', filterable: true },
    { header: 'URL', accessor: 'url', filterable: true },
  ] as const

  return (
    <main className="p-4">
      <AccessibilitySwitcher />
      {/* <DataSourceInputHeader url={url} onLoad={handleLoad} onReset={handleRest} /> */}
      <DataTable
        columns={columns}
        data={issues}
        onRowClick={(issue) => navigate(`/issues/${issue.id}`)}
      />
    </main>
  )
}
