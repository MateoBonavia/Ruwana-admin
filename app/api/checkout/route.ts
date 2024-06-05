import { NextRequest, NextResponse } from "next/server";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

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
    console.log(cartItems, customer);

    const total = cartItems.reduce(
      (acc: any, cartItem: any) =>
        acc + cartItem.item.price * cartItem.quantity,
      0
    );

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
      },
    });

    //
    // En el return mandamos lo necesario para MercadoPago y en el header el cors para evitar problemas. ⬇
    //
    return NextResponse.json(preference, { status: 200, headers: corsHeaders });
    // return new NextResponse(result.id, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.log("[checkout_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
