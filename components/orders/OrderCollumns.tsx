"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Orden",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original._id}`} className="hover:text-red-1">
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "products",
    header: "Productos",
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
  },
];
