
type Column<T> = {
    header: string
    accessor: keyof T
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

    // Fix the view for the table and style it with Tailwind

    // Implement responsivnes and different view for table on mobile (switchable and keeping persistance via local storage)

    // Implement state managment when returning from issue

    // Check if some sort of global theme will be needed along with Tailwind

    return (
        <table role="table" className="w-full border-collapse">
            <thead>
                <tr role="row">
                    {columns.map((col) => (
                        <th key={String(col.accessor)}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr
                        key={row.id}
                        role="row"
                        tabIndex={0}
                        className="cursor-pointer hover:bg-gray-100 focus:outline focus:ring"
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