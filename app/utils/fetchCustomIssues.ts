import { validateIssueData } from "./validateIssueData"

export async function fetchCustomIssues(url: string) {
    const res = await fetch(url)
    const json = await res.json()

    if (validateIssueData(json)) {
        throw new Error('Invalid data structure')
    }

    return json
}