import GeneralOrders from "@/lib/models/GeneralOrders";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { generalOrderId: String } }
) => {
  try {
    await connectToDB();

    const orderDetails = await GeneralOrders.findById(
      params.generalOrderId
    ).exec();

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return NextResponse.json(orderDetails, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("[generalOrderId_GET]", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
};
