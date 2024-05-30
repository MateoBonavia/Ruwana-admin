import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: `${process.env.MP_ACCESS_TOKEN}`,
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
    const { cartItems, customer } = await req.json();

    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const total = cartItems.reduce(
      (acc: number, cartItem: any) =>
        acc + cartItem.item.price * cartItem.quantity,
      0
    );

    //
    // Función para el checkout en MercadoPago. Guardar clerkId para poder obtener info del cliente ⬆

    const body = {
      items: [
        {
          id:
            cartItems.length > 1
              ? Number(cartItems[0].item._id) * Math.random()
              : cartItems[0].item._id,
          title:
            cartItems.length > 1
              ? cartItems.map((item: ProductType) => item.title).join(", ")
              : cartItems[0].title,
          quantity: 1,
          unit_price: Number(total),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://www.google.com/?hl=es",
        pending: "https://www.google.com/?hl=es",
        failure: "https://www.google.com/?hl=es",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });

    //
    // En el return mandamos lo necesario para MercadoPago y en el header el cors para evitar problemas. ⬇
    //
    return NextResponse.json(result, { status: 200, headers: corsHeaders });
    // return new NextResponse(result.id, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.log("[checkout_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
