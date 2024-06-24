"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/GeneralOrderItems/GeneralOrderItemsColumns";
import { Button } from "@/components/ui/button";
import { exportOrdersToExcel } from "@/utils/exportToExcel";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const GeneralOrderDetails = ({
  params,
}: {
  params: { generalOrderId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>();

  const getData = async () => {
    try {
      const res = await fetch(`/api/generalOrders/${params.generalOrderId}`);
      const orderDetails = await res.json();
      setOrderDetails(orderDetails);
      setLoading(false);
    } catch (error) {
      console.log("[generalOrderId_GET]", error);
    }
  };

  useEffect(() => {
    getData();
  }, [params.generalOrderId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Orden ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Cliente:{" "}
        <span className="text-base-medium">{orderDetails.customer}</span>
      </p>
      <p className="text-base-bold">
        Precio:{" "}
        <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <DataTable
        columns={columns}
        data={[orderDetails]}
        searchKey="productsName"
      />

      <Button
        className="bg-green-1 text-white"
        onClick={() => exportOrdersToExcel([orderDetails])}
      >
        Excel
        <Download className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default GeneralOrderDetails;
