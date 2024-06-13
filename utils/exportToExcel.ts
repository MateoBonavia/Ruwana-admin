import ExcelJs from "exceljs";

export const exportOrdersToExcel = async (orders: any[]) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Ruwana_Carteras_Ordenes");
  console.log(orders);

  worksheet.columns = [
    { header: "ID", key: "_id", width: 20 },
    { header: "Cliente", key: "customer", width: 20 },
    { header: "Cantidad", key: "quantity", width: 20 },
    { header: "Importe", key: "totalAmount", width: 20 },
    // { header: "Producto", key: "product", width: 20 },
    { header: "Fecha", key: "createdAt", width: 20 },
  ];

  orders.forEach((order) => {
    worksheet.addRow({
      _id: order._id,
      customer: order.customer,
      quantity: order.products,
      totalAmount: order.totalAmount,
      // product: order.product,
      createdAt: order.createdAt,
    });
  });

  //   const buffer = await workbook.xlsx.writeBuffer();

  //   const blob = new Blob([buffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "Ruwana_Ordenes.xlsx";
  //   a.click();
  //   URL.revokeObjectURL(url);
};
