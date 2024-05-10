"use client";

import Delete from "@/components/custom ui/Delete";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
    cell: ({ row }) => (
      <Link
        href={`collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Productos",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} />,
  },
];
