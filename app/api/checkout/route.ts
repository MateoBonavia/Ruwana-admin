import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: "",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();

    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    console.log(cartItems, customer);

    // const total = cartItems.reduce(
    //   (acc: number, cartItem: { cartItem: ProductType[] }) =>
    //     acc + cartItem.item.price * cartItem.quantity,
    //   0
    // );

    // const body = {
    //   items: [
    //     {
    //       title:
    //         cartItems.length > 1
    //           ? cartItems.map((item: ProductType) => item.title).join(", ")
    //           : cartItems[0].title,
    //       quantity: 1,
    //       unit_price: Number(total),
    //       currency_id: "ARS",
    //     },
    //   ],
    //   back_urls: {
    //     success: "http://localhost:3000/success",
    //     pending: "http://localhost:3000/pending",
    //     failure: "http://localhost:3000/failure",
    //   },
    //   auto_return: "approved",
    // };
    // const preference = new Preference(client);
    // const result = await preference.create({ body });
    // result.json({
    //   id: result.id,
    // });

    //
    // Función para el checkout en MercadoPago. Guardar clerkId para poder obtener info del cliente ⬆
    //
    // En el return mandamos lo necesario para MercadoPago y en el header el cors para evitar problemas. ⬇
    //
    // return NextResponse.json(Algo, { headers: corsHeaders})
  } catch (error) {
    console.log("[checkout_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
