import { Issue } from "~/data/issues"
import { mapIssueToTableRows } from "../issueMapper"

describe('mapIssueToTableRow', () => {
  it('maps issue data to table rows correctly', () => {
    const issues: Issue[] = [
      {
        id: 0,
        issueType: 'Interactable Role',
        severity: 'Critical',
        component: 'ABC',
        selector: '.foo > #bar',
        url: 'https://www.zzzz.co.uk',
        description: 'The button is not keyboard accessible.',
        codeSnippet: '<button>Click me</button>',
        screenshot: 'https://via.placeholder.com/150',
      }
    ]

    const result = mapIssueToTableRows(issues)
    expect(result[0]).toMatchObject({
      no: 1,
      id: 0, 
      issueType: 'Interactable Role',
      selector: '.foo > #bar',
    })
  })
})