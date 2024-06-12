import { NextRequest, NextResponse } from "next/server";
// SDK de Mercado Pago
import { Preference } from "mercadopago";
import { client } from "@/lib/mercadopago";
// Agrega credenciales

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    //
    // Función para el checkout en MercadoPago. Guardar clerkId para poder obtener info del cliente ⬆
    const { cartItems, customer } = await req.json();
    // console.log(cartItems, customer);

    const total = cartItems.reduce(
      (acc: any, cartItem: any) =>
        acc + cartItem.item.price * cartItem.quantity,
      0
    );

    const productsId = cartItems.map((item: any) => item.item.id);

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "Compra",
            title:
              cartItems.length === 1 ? cartItems[0].title : "Varios productos",
            quantity: 1,
            unit_price: total,
          },
        ],
        payer: {
          email: customer.email,
        },
        metadata: {
          name: customer.name,
          email: customer.email,
          clerkId: customer.clerkId,
          products: cartItems.map((product: any) => ({
            productId: product.item.id,
            quantity: product.quantity,
            price: product.item.price,
            ...(product.size && { size: product.size }),
            ...(product.color && { color: product.color }),
          })),
        },
        back_urls: {
          success: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
          failure: `${process.env.ECOMMERCE_STORE_URL}/payment_failure`,
          pending: `${process.env.ECOMMERCE_STORE_URL}/payment_pending`,
          // success: "https://www.google.com/?hl=es",
          // failure: "https://www.google.com/?hl=es",
          // pending: "https://www.google.com/?hl=es",
        },
      },
    });

    //
    // En el return mandamos lo necesario para MercadoPago y en el header el cors para evitar problemas. ⬇
    //
    return NextResponse.json(preference, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.log("[checkout_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
