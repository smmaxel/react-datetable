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
            <button onClick={() => navigate(-1)} className="mb-4 underline">
                Back
            </button>
            <h2 className="text-xl font-bold">{issue.issueType}</h2>
            <DataTableDetails item={issue} />
        </main>
    )
}