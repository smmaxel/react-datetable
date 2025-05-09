import type { Issue, IssueTableRow } from "~/data/issues";

export function mapIssueToTableRows(issues: Issue[]): IssueTableRow[] {
    return issues.map(({id, issueType, severity, component, selector, url}, index) => ({
        no: index + 1,
        id,
        issueType,
        severity,
        component,
        selector,
        url,
    }))
}