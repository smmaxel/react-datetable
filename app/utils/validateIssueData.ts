export function validateIssueData(data: any): boolean {
  return (
    Array.isArray(data) &&
    data.every((item) =>
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'issueType' in item &&
      'severity' in item &&
      'component' in item &&
      'selector' in item &&
      'url' in item &&
      'description' in item &&
      'codeSnippet' in item &&
      'screenshot' in item
    )
  )
}