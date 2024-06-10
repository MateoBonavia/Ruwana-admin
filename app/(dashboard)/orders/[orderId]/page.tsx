import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`);
  const { orderDetails, customer } = await res.json();
  console.log(orderDetails);

  return (
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
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
