import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export default function PayoutTable() {


    <tr>
        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
            Name
        </th>
        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
            Available Balance
        </th>
        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
            Amount Requested
        </th>
        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
            Date
        </th>
        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
            Status
        </th>
        <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
            Action
        </th>
    </tr>
    return (
        <div className=" w-full flex flex-col gap-6 items-center " >
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>Available Balance</TableColumn>
                    <TableColumn>Amount Requested</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow> 
                </TableBody>
            </Table>
            <Pagination showControls initialPage={1} total={10} />
        </div>
    )
}