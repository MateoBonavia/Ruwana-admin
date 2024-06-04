import { NextRequest, NextResponse } from "next/server";

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

    //
    // En el return mandamos lo necesario para MercadoPago y en el header el cors para evitar problemas. ⬇
    //
    return NextResponse.json({ status: 200, headers: corsHeaders });
    // return new NextResponse(result.id, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.log("[checkout_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
