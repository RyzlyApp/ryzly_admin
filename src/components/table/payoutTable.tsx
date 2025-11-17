"use client"
import { useFetchData } from "@/hook/useFetchData";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { LoadingLayout } from "../shared";

export default function PayoutTable() {


    const { data, isLoading } = useFetchData<any>({ name: "application", endpoint: "/payout/admin" });

    return (
        <LoadingLayout loading={isLoading} lenght={data?.item?.lenght} >
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
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Pagination showControls initialPage={1} total={10} />
            </div>
        </LoadingLayout>
    )
}