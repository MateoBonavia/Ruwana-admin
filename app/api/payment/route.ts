import { client } from "@/lib/mercadopago";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { Payment } from "mercadopago";

import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req
      .json()
      .then((data) => data as { data: { id: string } });
    // const signature = req.headers.get("x-mp-signature") as string;

    const payment = await new Payment(client).get({ id: body.data.id });

    if (payment) {
      const customerInfo = {
        clerkId: payment?.metadata.clerk_id,
        name: payment?.metadata.name,
        email: payment?.metadata.email,
      };

      // En un futuro mandar por metadata o mediante otro medio datos de envió ⬇
      const shippingAddress = payment?.metadata.shipping_address;
      const shippingComments = payment?.metadata.shipping_comments;

      // Guardamos el ID de la orden ⬇
      const orderId = payment?.id;

      // Guardamos los datos el/los producto/s ⬇
      const orderItems = payment?.metadata.products.map((product: any) => ({
        product: product.product_id,
        color: product.color || "N/A",
        size: product.size || "N/A",
        quantity: product.quantity,
      }));

      await connectToDB();

      const newOrder = new Order({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress: shippingAddress,
        shippingComments: shippingComments,
        totalAmount: payment?.transaction_amount,
      });

      await newOrder.save();

      let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

      if (customer) {
        customer.orders.push(newOrder._id);
      } else {
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
        });
      }
      await customer.save();
    }

    return Response.json("Orden creada", { status: 200, headers: corsHeaders });
  } catch (error) {
    console.log("[payment_POST]", error);
    return new NextResponse("Failed to create the order", {
      status: 500,
      headers: corsHeaders,
    });
  }
};
