"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orderItems/OrderItemsColumns";
import { Button } from "@/components/ui/button";
import { exportOrdersToExcel } from "@/utils/exportToExcel";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [customer, setCustomer] = useState<any>();

  const getDate = async () => {
    try {
      const res = await fetch(`/api/orders/${params.orderId}`);
      const { orderDetails, customer } = await res.json();
      setOrderDetails(orderDetails);
      setCustomer(customer);
      setLoading(false);
    } catch (error) {
      console.log("[orderDetails_GET]", error);
    }
  };

  useEffect(() => {
    getDate();
  }, [params.orderId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Orden ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Cliente: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Precio:{" "}
        <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Envió:
        <span className="text-base-medium">{orderDetails.shippingAddress}</span>
      </p>
      {orderDetails.shippingComments && (
        <p className="text-base-bold">
          Comentarios:
          <span className="text-base-medium">
            ${orderDetails.shippingComments}
          </span>
        </p>
      )}

      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
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

export default OrderDetails;
