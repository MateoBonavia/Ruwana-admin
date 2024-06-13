import ExcelJs from "exceljs";

export const exportOrdersToExcel = async (orders: OrderColumnType[]) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Ruwana_Carteras_Ordenes");

  worksheet.columns = [
    { header: "ID", key: "_id", width: 30 },
    { header: "Cliente", key: "customer", width: 20 },
    { header: "Email", key: "email", width: 30 },
    { header: "Cantidad de productos", key: "productsQuantity", width: 25 },
    { header: "Producto/s", key: "products", width: 30 },
    { header: "Importe", key: "totalAmount", width: 15 },
    { header: "Fecha", key: "createdAt", width: 30 },
  ];

  Promise.all(
    orders.map(async (order) => {
      const res = await fetch(`/api/orders/${order._id}`);
      const { orderDetails, customer } = await res.json();
      return {
        id: orderDetails._id,
        customer: customer.name,
        email: customer.email,
        productsQuantity: orderDetails.products.length,
        products: orderDetails.products
          .map((productDetail: any) => productDetail.product.title)
          .join(", "),
        totalAmount: orderDetails.totalAmount,
        createdAt: orderDetails.createdAt,
      };
    })
  )
    .then((completedOrders) => {
      completedOrders.forEach((orderForExcel) => {
        worksheet.addRow({
          _id: orderForExcel.id,
          customer: orderForExcel.customer,
          email: orderForExcel.email,
          productsQuantity: orderForExcel.productsQuantity,
          products: orderForExcel.products,
          totalAmount: orderForExcel.totalAmount,
          createdAt: orderForExcel.createdAt,
        });
      });
    })
    .then(async () => {
      const buffer = await workbook.xlsx.writeBuffer();

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Ruwana_Ordenes.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
};
