import { useEffect, useMemo, useRef, useState } from "react"
import { useIssueContext } from "~/context/IssueContext"

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

  const [sort, setSort] = useState<{
    column: keyof T
    direction: 'asc' | 'desc'
  } | null>({
    column: 'no',
    direction: 'asc',
  })

  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({})

  const selectedRowRef = useRef<HTMLTableRowElement>(null)

  // check do we need a theme file for adding all of the different stylings (check Tailwind best practices)

  // implement useState along with localStorage for different view

  // implement state along with localStorage for high contrast mode

  // set everything to rems so that we can change things globaly (maybe even differnt font size)

  // check everything as a screen reader 

  // check how tabindex is working with forward / backwards navigation

  // unit test everything that could be tested


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
    <table role="table" className="w-full border-collapse text-center">
      <thead className="h-[45px] bg-[#607085] text-[12px] uppercase font-serif">
        <tr role="row">
          {columns.map((col) => (
            <th
              key={String(col.accessor)}
              className={`cursor-pointer ${sort?.column === col.accessor ? 'bg-[#435060]' : ''
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
                    className=" text-black text-xs p-1 bg-white rounded-[0.5rem]"
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

      <tbody className=" bg-white text-[#121516] text-[12px] font-serif place-self-center">
      {filteredAndSortedData.map((row) => (
          <tr
            key={row.id}
            role="row"
            tabIndex={0}
            ref={selectedRowRef}
            className="cursor-pointer hover:bg-gray-100 h-[45px] focus:outline focus:ring"
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
  )
}

