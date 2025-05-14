import { validateIssueData } from "../validateIssueData";

describe('validateIssueData', () => {
  it('returns true for valid issue data', () => {
    const validData = [{
      id: 0,
      issueType: 'Interactable Role',
      severity: 'Critical',
      component: 'ABC',
      selector: '.foo > #bar',
      url: 'https://www.zzzz.co.uk',
      description: 'The button is not keyboard accessible.',
      codeSnippet: '<button>Click me</button>',
      screenshot: 'https://via.placeholder.com/150',
    }]
    expect(validateIssueData(validData)).toBe(true)
  })

  it('returns false for invalid issue data', () => {
    const invalidData = [{ bid: 123, test: 'test' }]
    expect(validateIssueData(invalidData)).toBe(false)
  })
})