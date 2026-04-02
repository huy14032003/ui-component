import React from 'react'
import { PageHeader } from '@/Test'
import { Table } from '@components/ui/table/Table'
import { Badge } from '@components/ui/badge/Badge'
import { type ColumnDef } from '@tanstack/react-table'

const TablePage = () => {
    const data = React.useMemo(() => [
        { id: '1', name: 'Huy Tran', email: 'huy@example.com', role: 'Owner', status: 'Active', amount: '1.500.000đ' },
        { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', amount: '850.000đ' },
        { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive', amount: '320.000đ' },
        { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Active', amount: '95.000đ' },
        { id: '5', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Pending', amount: '200.000đ' },
    ], []);
    const columns: ColumnDef<any>[] = [
        { accessorKey: 'name', header: 'Họ tên' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'role', header: 'Vai trò' },
        { accessorKey: 'amount', header: 'Giao dịch' },
        {
            accessorKey: 'status', header: 'Trạng thái',
            cell: ({ getValue }: any) => {
                const s = getValue() as string;
                const v = s === 'Active' ? 'success' : s === 'Inactive' ? 'danger' : 'warning';
                return <Badge variant={v as any} size="sm" pulse={s === 'Active'}>{s}</Badge>;
            }
        },
    ];
    return (
        <div className="max-w-5xl">
            <PageHeader title="Data Table" description="Bảng dữ liệu mạnh mẽ với sort, pagination, row selection." />
            <Table data={data} columns={columns} enableRowSelection enablePagination />
        </div>
    );
};

export default TablePage;
