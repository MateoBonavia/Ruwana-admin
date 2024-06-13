"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { exportOrdersToExcel } from "@/utils/exportToExcel";
import { Download } from "lucide-react";

import { useEffect, useState } from "react";
import DatePickerWithRange from "@/components/custom ui/DatePickerWithRange";
import { DateRange } from "react-day-picker";

const Orders = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const orders = await res.json();

      setOrders(orders);
      setLoading(false);
    } catch (error) {
      console.log("[orders_GET]", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onDownloadExcel = () => {
    if (!date) {
      // exportOrdersToExcel(orders);
    } else {
      const filteredOrders = orders.filter((order: any) => {
        return order.createdAt >= date?.from && order.createdAt <= date?.to;
      });

      // exportOrdersToExcel(filteredOrders);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Ordenes</p>
      <Separator className="bg-grey-1 my-5" />

      <DataTable columns={columns} data={orders} searchKey="_id" />

      <div className="flex gap-2">
        <Button className="bg-green-1 text-white" onClick={onDownloadExcel}>
          Excel
          <Download className="h-4 w-4 ml-2" />
        </Button>

        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
