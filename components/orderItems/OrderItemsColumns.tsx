"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Producto",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original.product._id}`}
        className="hover:text-red-1"
      >
        {row.original.product.title}
      </Link>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Tamaño",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
];
