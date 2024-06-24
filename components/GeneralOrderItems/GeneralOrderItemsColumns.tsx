"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<GeneralOrderType>[] = [
  {
    accessorKey: "productsName",
    header: "Producto",
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
    accessorKey: "products",
    header: "Cantidad",
  },
];
