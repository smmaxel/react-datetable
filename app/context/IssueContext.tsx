import { type Dispatch, type ReactNode, useReducer, useContext } from "react";
import { createContext } from "react";

type State = {
  selectedIssueId: number | null
}

type Action =
  | { type: "SELECT_ISSUE"; payload: number }
  | { type: "CLEAR_SELECTION" }

const initialState: State = {
  selectedIssueId: null,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_ISSUE":
      return { ...state, selectedIssueId: action.payload }
    case "CLEAR_SELECTION":
      return { ...state, selectedIssueId: null }
    default:
      return state
  }
}

type IssueContextType = {
  state: State
  dispatch: Dispatch<Action>
}

const IssueContext = createContext<IssueContextType | undefined>(undefined)

export const IssueProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <IssueContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueContext.Provider>
  )
}

export const useIssueContext = (): IssueContextType => {
  const context = useContext(IssueContext)

  if (!context) {
    throw new Error('useIssueContext must be used within an IssueProvider')
  }

  return context
}