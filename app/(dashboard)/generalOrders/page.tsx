"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { exportOrdersToExcel } from "@/utils/exportToExcel";
import { Download, Plus } from "lucide-react";

import { useEffect, useState } from "react";
import DatePickerWithRange from "@/components/custom ui/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

const GeneralOrders = () => {
  const router = useRouter();

  const [date, setDate] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/generalOrders");
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

  const parseOrderDate = (dateString: string) => {
    // Removemos el sufijo "th" y convertimos la cadena en un formato compatible con Date.
    const cleanDateString = dateString.replace(/(\d+)(th|st|nd|rd)/, "$1");
    return new Date(cleanDateString);
  };

  const onDownloadExcel = () => {
    if (!date?.from || !date?.to) {
      exportOrdersToExcel(orders);
      return;
    }

    const fromDate = new Date(date.from);
    const toDate = new Date(date.to);

    const filteredOrders = orders.filter((order: any) => {
      const orderDate = parseOrderDate(order.createdAt);
      return orderDate >= fromDate && orderDate <= toDate;
    });

    exportOrdersToExcel(filteredOrders);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Ordenes Generales</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/generalOrders/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar nueva orden
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />

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

export default GeneralOrders;
