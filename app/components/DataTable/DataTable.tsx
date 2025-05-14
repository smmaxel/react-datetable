import { useEffect, useMemo, useRef, useState, type SelectHTMLAttributes } from "react"
import { useIssueContext } from "~/context/IssueContext"
import { useScreenSize } from "~/hooks/useScreenSize"
import { useViewMode } from "~/hooks/useViewMode"

type Column<T> = {
  header: string
  accessor: keyof T
  filterable?: boolean
}

type DataTableProps<T> = {
  columns: readonly Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  const { state } = useIssueContext()
  const selectedId = state.selectedIssueId
  const [viewMode, setViewMode] = useViewMode()

  const [sort, setSort] = useState<{
    column: keyof T
    direction: 'asc' | 'desc'
  } | null>({
    column: 'no',
    direction: 'asc',
  })

  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({})

  const selectedRowRef = useRef<HTMLTableRowElement>(null)
  const screen = useScreenSize()

  const toggleSort = (column: keyof T) => {
    setSort((prev) => {
      if (!prev || prev.column !== column) {
        return { column, direction: 'asc' }
      }
      return {
        column,
        direction: prev.direction === 'asc' ? 'desc' : 'asc'
      }
    })
  }

  const updateFilter = (column: keyof T, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }))
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    for (let key in filters) {
      const value = filters[key]

      if (value) {
        result = result.filter((row) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase()))
      }
    }

    if (sort) {
      const { column, direction } = sort
      result.sort((a, b) => {
        const aVal = a[column]
        const bVal = b[column]

        return direction === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal))
      })
    }

    return result
  }, [data, filters, sort])

  useEffect(() => {
    if (selectedRowRef.current) {
      selectedRowRef.current.focus()
    }
  }, [selectedId])

  return (
    <>
      {screen.isMobile && (
        <button
        className="mb-4 px-4 py-2 bg-button rounded"
        onClick={() => setViewMode(viewMode === 'scroll' ? 'card' : 'scroll')}
      >
        Switch to {viewMode === 'scroll' ? 'Card' : 'Table'}
      </button>
      )}

      {viewMode === 'card' && screen.isMobile && (
        <div className="mb-4">
          <label htmlFor="sort-select" className="mr-2 text-sm font-semibold">Sort by:</label>
          <select
            id="sort-select"
            className="text-black p-2 border rounded bg-white"
            value={sort?.column ? String(sort.column) : ''}
            onChange={(e) => {
              const column = e.target.value as keyof T
              toggleSort(column)
            }}
          >
            {columns.map((col) => (
              <option
                key={String(col.accessor)}
                value={String(col.accessor)}
              >
                {col.header}
              </option>
            ))}
          </select>
          {sort && (
            <button
              className="ml-2 text-sm underline text-blue-600"
              onClick={() => toggleSort(sort.column)}
            >
              {sort.direction === 'asc' ? 'ASC \u21E7' : 'Desc \u21E9'}
            </button>
          )}
          <div className="space-y-4">
            {filteredAndSortedData.map((row) => (
              <div
                key={row.id}
                role="button"
                tabIndex={0}
                onClick={() => onRowClick?.(row)}
                onKeyDown={(e) => e.key === 'Enter' && onRowClick?.(row)}
                className="p-4 border roujnded-md bg-white text-black shadow focus:outline focus:ring"
              >
                {columns.map((col) => (
                  <p key={String(col.accessor)} className="text-sm">
                    <strong>{col.header}: </strong>{String(row[col.accessor])}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode !== 'card' && (
        <div className="overflow-x-auto">
          <table role="table" className="w-full border-collapse text-center">
            <thead className="h-[2.8125rem] text-[0.75rem] uppercase font-sans">
              <tr role="row">
                {columns.map((col) => (
                  <th
                    key={String(col.accessor)}
                    className={`cursor-pointer px-4 sm:px-2 text-nowrap ${sort?.column === col.accessor ? 'bg-brand-dark' : ''
                      }`}
                    onClick={() => toggleSort(col.accessor)}
                  >
                    <div className="flex items-center justify-center gap-2 select-none">
                      <div className="flex items-center gap-1">
                        <span>{col.header}</span>
                        <span className="text-sm">
                          {sort?.column === col.accessor ? (
                            <span className="text-sm">
                              {sort.direction === 'asc' ? '\u21E7' : '\u21E9'}
                            </span>
                          ) : '\u21F3'}
                        </span>
                      </div>

                      {col.filterable && (
                        <input
                          type="text"
                          aria-label={`filter ${String(col.accessor)}`}
                          className="p-1 rounded-[0.5rem]"
                          value={filters[col.accessor] || ''}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateFilter(col.accessor, e.target.value)}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="place-self-center">
              {filteredAndSortedData.map((row) => (
                <tr
                  key={row.id}
                  role="row"
                  tabIndex={0}
                  ref={selectedRowRef}
                  className="cursor-pointer focus-visible:outline-none"
                  onClick={() => onRowClick?.(row)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onRowClick?.(row)
                  }}
                >
                  {columns.map((col) => (
                    <td key={String(col.accessor)}>{String(row[col.accessor])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

